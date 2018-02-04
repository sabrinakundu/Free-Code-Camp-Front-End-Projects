$(document).ready(function() {
  
  var $search = $('#search'),
      $search_input = $search.find('#search-input'),
      $search_auto = $search.find('#search-complete'),
      $success = $('#success'),
      $failed = $('#failed');
  
  var auto_source = $search_auto.find('#complete-template').html(),
      res_source = $success.find('#result-template').html();
  var auto_template = Handlebars.compile(auto_source),
      res_template = Handlebars.compile(res_source);
  
  function hideResult() {
    $success.css('display', 'none');
    $failed.css('display', 'none');
  }
  
  var lastSearch = "";
  function loadShowResults(search_term) {
    
    if(typeof search_term === 'undefined' || lastSearch === search_term.toLowerCase()) {
      return;
    }
    lastSearch = search_term.toLowerCase();
    
    hideResult();
    
    if(search_term.length === 0) {
      return;
    }
    $.getJSON('https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exlimit=max&explaintext&exintro&exsentences=1&gsrsearch=' + encodeURIComponent(search_term) + '&callback=?', function(data) {
      
      var results = [];
      if(data.query && data.query.pages) {
        
        for(var pid in data.query.pages) {
          var page = data.query.pages[pid];
          results.push({id: page.pageid, title: page.title, desc: page.extract})
        }
      }
      
      var info = {results: results};
      $success.html(res_template(info));
      $success.css('display', 'block');
    }).fail(function() {
      
      $failed.css('display', 'block');
    });
  }
  
  
  var lastAuto = "";
  var lastAutos = [];
  var autoPos = 0, autoResults;
  function setAuto(arr, over) {
    
    $('.auto-result').off('click', autoClick);
    if(arr && arr.length > 0) {
      
      var loc = lastAutos.lastIndexOf(arr[0]);
      if(loc >= 0 || over) {
        
        lastAutos.splice(loc, 1);
        autoPos = 0; 
        autoResults = arr;
        
        var info = {results: arr.slice(1)};
        
        $search_auto.html(auto_template(info));
      }
      
      $('.auto-result').on('click', autoClick);
    } else {
      
      $search_auto.html('');
    }
  }
  
  setAuto([''], true);
  
  function updateAutoScroll() {
    
    if(autoResults) {
      
      var new_auto = autoResults[autoPos];
      lastAuto = new_auto; 
      $search_input.val(new_auto); 
      $search_auto.find('.auto-result').each(function(i) {
        
        var $el = $(this);
        if(autoPos === i + 1) { 
          $el.addClass('selected');
        } else {
          $el.removeClass('selected');
        }
      });
    }
  }
  
  function loadAuto(search_term) {
    
    if(lastAuto === search_term) {
      return;
    }
    lastAuto = search_term;
    lastAutos.push(search_term);
    
    if(search_term.length === 0) {
      setAuto([''], true);
      return;
    }
    $.getJSON('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + encodeURIComponent(search_term) + '&callback=?', function(data) {
      
      var results = [search_term];
      for(var i = 0; i < data[1].length; i++) { 
        results.push(data[1][i]);
      }
      setAuto(results);
    }).fail(function() {
      
      setAuto();
    });
  }
  
  function searched() {
    var input = $search_input.val().replace(/\s+/g, ' ');
    if(input.length > 0) {
      loadShowResults(input);
    } else {
      hideResult();
    }
  }
  
  var auto_visible = false;
  function showAuto(term) {
    
    var search_term = term;
    if(typeof term !== 'string') {
      search_term = $search_input.val().replace(/\s+/g, ' ');
    }
    
    loadAuto(search_term);
 
    if(auto_visible === false && search_term.length > 0) {
      $search.addClass('auto');
      auto_visible = true;
    }
  }
  function hideAuto() {
    
    if(auto_visible === true) {
      $search.removeClass('auto');
      auto_visible = false;
    }
  }
  function autoClick() { 
    if($(this).data('invalid') === true) {
      return;
    }
    
    var search_term = $(this).text();
    $search_input.val(search_term);
    loadShowResults(search_term);
    hideAuto();
  }
  var lastInput = "";
 
  function searchUpdated() {
    var search_term = $search_input.val().replace(/\s+/g, ' ');
    
    if(lastInput === search_term) {
      return;
    }
    lastInput = search_term;
  
    if(search_term.length > 0) {
      showAuto(search_term);
    } else {
  
      showAuto('');
      hideAuto();
    }
  }
  function searchPressed(e) {
    switch(e.which) {
      case 13: { 
        searched();
        hideAuto();
      } break;
      case 38: { 
        if(autoPos <= 0) {
          autoPos = autoResults.length;
        }
        autoPos--;
        updateAutoScroll();
        
        e.preventDefault();
      } break;
      case 40: { 
        autoPos++;
        if(autoPos >= autoResults.length) {
          autoPos = 0;
        }
        updateAutoScroll();
        
        e.preventDefault();
      } break;
      
      default: searchUpdated(); break;
    }
  }
  $search_input.on('keyup', searchPressed);
  $search_input.on('focus', showAuto);
  $search_input.on('blur', hideAuto);
  $search.on('focusin', showAuto); 
  
  });