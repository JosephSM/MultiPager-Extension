define('modules/daf/modules/dafview',[
  'backbone',
  'text2!modules/daf/templates/dafview.html',
  'lib/popcorn/popcorn',
  'wrap!jquery.kinetic',
  'wrap!jQuery.XDomainRequest'
], 
function(Backbone,template) {
	var zoom = 1;

  $linePointer = $("<image src=/images/"+profile.pointer+'.pointer.png style="z-index:999;position:absolute;display:none">');
  $highlighter = $("<div style='opacity:.5;display:none;position:absolute;'>");

  Popcorn.plugin( "amudSwap", {
    start: function(event,options) {
      console.log('amudSwap');
      options.dafView.currentAmud = options.amud;
      options.amud.svg.css({opacity:1});
      options.dafView.trigger('amudSwitched',options.amud);
    },
    end: function(event,options) {
      options.amud.svg.css({opacity:0});
    }
  });

  Popcorn.plugin( "timepoint" , {
    start: function( event, options ){
      console.log('timepoint');;
      var zoomFactor = 1+(zoom/10);
      if (!profile.pointer) {
        $linePointer.hide();
      }
      else {
        $linePointer.show();
      }
      
      $highlighter.css('background','#'+(profile.highlightColor||'FFFF00'));
      
      if (!profile.highlight || (profile.highlight != 'highlight' && profile.highlight != 'underline')) {
        $highlighter.hide();
      }
      else {
        $highlighter.show(); 
      }

      var lines = options.dafView.currentAmud.lines;  
      
      var line = options.line - options.dafView.currentAmud.lineOffset;

      $linePointer.css('top', (parseInt(lines[line].y)-3-6) * zoomFactor);
      $linePointer.data('top',parseInt(lines[line].y)-3-6);

      $linePointer.css('left', (Math.floor(parseInt(lines[line].x[0]))) * zoomFactor);
      $linePointer.data('left', (Math.floor(parseInt(lines[line].x[0]))));

      $highlighter.css('top', ((parseInt(lines[line].y)-3-7) + (profile.highlight == 'underline' ? 10 : 0))* zoomFactor);
      $highlighter.css('left', (parseInt(lines[line].x[1])) * zoomFactor);
      $highlighter.data('top',(parseInt(lines[line].y)-3-7));
      $highlighter.data('left',(parseInt(lines[line].x[1])));

      var width = (parseInt(lines[line].x[0]) - parseInt(lines[line].x[1]) + 6) * zoomFactor; 

      $highlighter.css({'width':width,'height':(profile.highlight == 'highlight' ? 15 : 2)*zoomFactor});  
      $highlighter.data('width',(parseInt(lines[line].x[0]) - parseInt(lines[line].x[1]) + 6));
      this.trigger('pointerMoved',line);
    },
    end: function( event, options ){
        var lines = options.dafView.currentAmud.lines;
      
        var line = options.line - options.dafView.currentAmud.lineOffset;
     }
  });

  var isMobile = navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
    navigator.userAgent.match(/Opera Mini/i) ||
    navigator.userAgent.match(/IEMobile/i);

  var Dafview = Backbone.View.extend({
    events: {
      'click #zoomOut': function() {this.options.profile.zoomOut();},
      'click #zoomIn': function() {this.options.profile.zoomIn();},
      'dblclick .daf': function(e) {
        e.ctrlKey ? this.options.profile.zoomOut() : this.options.profile.zoomIn();
      }
    },
    initialize: function() {
      Popcorn.plugin.debug = true;
      this.rendered = new $.Deferred();
      this.loaded = new $.Deferred();
      this.canplay = function() {
        var dfd = new $.Deferred();
        if (this.options.popcorn.media.readyState >= 2) {
          dfd.resolve();
        }

        this.options.popcorn.listen('canplay',function() {
          dfd.resolve();
        });

        return dfd;
      }.bind(this);
    
      var lastTime = 0;

      this.options.popcorn.listen('timeupdate', () => {
        const currentTime = this.options.popcorn.currentTime()

        if (currentTime - lastTime > 5) {
          $.post('/api/saveLocation',{
            daf:daf._id,
            time:currentTime
          });

          lastTime = currentTime
        }
      })


      this.options.popcorn.listen('pause', () => {
        const currentTime = this.options.popcorn.currentTime()


          $.post('/api/saveLocation',{
            daf:daf._id,
            time:currentTime
          });

          lastTime = currentTime
      })

      if (this.options.profile.get('backgroundColor') == "#FAF3E1") {
        $("body").addClass('dafview-color');
      }

      this.options.profile.on('change',function(){
        profile = this.options.profile.toJSON();
        if (!profile.pointer) {
          $linePointer.hide();
        }
        else {
          $linePointer.show();
        }
        
       if (!profile.highlight || (profile.highlight != 'highlight' && profile.highlight != 'underline')) {
          $highlighter.hide();
        }
        else {
          $highlighter.show(); 
        }
        
        $highlighter.css('backgroundColor','#'+profile.highlightColor);
        $linePointer.attr('src',"/images/"+profile.pointer+'.pointer.png');
        this.doZoom(profile.zoom);

        if (profile.backgroundColor == "#FAF3E1") {
          $("body").addClass('dafview-color');
        }
        else {
          $("body").removeClass('dafview-color'); 
        }

      },this);
    },
    doZoom: function(level,init) {
      if (level < 3 || level > 36) {
        return;
      }
      //this.options.app.state.set('dafview','zoom',level);

      var func = init ? 'css' : 'animate';
      this.zoom = level;
      zoom = this.zoom; 
      var zoomFactor = 1+(level/10);
      var controls = {};

      this.$(".daf,#dafPanner").each(function() {
        var props = {
          height:793*zoomFactor,
          width:538*zoomFactor,
        }

        if (this.id == 'dafPanner' && (zoom < 9 || controls.fullscreen)) {
          props.left = (1000-(538*zoomFactor))/2;
          if (controls.fullscreen) {  
            props.left = ($("#canvasHolder").width()-(538*zoomFactor))/2;
          }
        }
        else {
          props.left = 0;
        }
        
        $(this)[func](props,200);
      });
      
      $highlighter[func]({
        top:($highlighter.data('top') + (profile.highlight == 'highlight' ? 0 : 10)) * zoomFactor,
        left:$highlighter.data('left')*zoomFactor,
        height:(profile.highlight == 'highlight' ? 15 : 2) * zoomFactor,
        width:$highlighter.data('width')*zoomFactor
      },200);

      $linePointer[func]({
        top:$linePointer.data('top')*zoomFactor,
        left:$linePointer.data('left')*zoomFactor,
        width:(profile.pointer == 'pen' ? 493 : 40)*zoomFactor/1.9,
        height:(profile.pointer == 'pen' ? 570 : 40)*zoomFactor/1.9
      },200);

      this.$(".highlighter").each(function(i,el) {
          $(el)[func]({
          top:$(el).data('top') * zoomFactor,
          left:$(el).data('left')*zoomFactor,
          height:15 * zoomFactor,
          width:$(el).data('width')*zoomFactor
        },200);
      });
    },
    render: function() {
      if (Modernizr.video == '') {
        this.$el.html('Your browser is not supported');
        return this;
      }

      this.$el.html(template); 

      $linePointer.appendTo(this.$('#dafPanner'));
      $highlighter.appendTo(this.$('#dafPanner'));

      this.rendered.resolve();

      return this;
    },
    loadDaf: function(daf) {
      this.daf = daf;
      var deferreds = [this.rendered];
      
      daf.set('amudim',_(daf.get('amudim')).sortBy(function(a){
        return String.fromCharCode(a.daf);
      }));
     
      var amudimLoaded = [];
      for(i in daf.get('amudim')) {
        var amud = daf.get('amudim')[i];          
        amudimLoaded.push($.getJSON('https://assets.dafapp.com/dappim/'+amud.masechta+'/'+amud.daf+'/'+amud.amud+'.json?domain='+location.host+'?v=33'));
      }

      deferreds.push($.when.apply(null,amudimLoaded).then(function(){
        for(var i = 0; i < amudimLoaded.length; i++) {
          var amud = daf.get('amudim')[i];          
          if (!isMobile) {
            amud.svg = 'https://assets.dafapp.com/dappim/'+amud.masechta+'/'+amud.daf+'/'+amud.amud+'.png?v=055';
          }
          else {
            amud.svg = 'https://assets.dafapp.com/dappim/'+amud.masechta+'/'+amud.daf+'/'+amud.amud+'_1376.png?v=055';
          }

          amud.lines = amudimLoaded.length > 1 ? arguments[i][0] : arguments[0];
        }
      }));


      $.when.apply(null,deferreds).then(function() {
        this.videoElA = this.options.popcorn.media;

        var initialLoad = true;

        var autoPlay = function() {
          if (initialLoad) {
            //this.options.popcorn.listen('canplay', function() {
              $.when(this.loaded).then(function() {
                var timestamp;
                /*if (timestamp = this.options.app.state.state.dafview.timestamp) {
                  this.options.popcorn.currentTime(timestamp);
                }*/
                this.options.popcorn.play()//.pause();
                initialLoad = false;
              }.bind(this));
            //}.bind(this));
          }
        }.bind(this);  
        
        var svgsLoaded = [];

        
        _(daf.get('amudim')).each(function(amud,i) {
          var dfd = new $.Deferred();
          svgsLoaded.push(dfd);

          amud.svg = $('<img class="daf" width=538.583 height=793.701 src="'+amud.svg.replace('.svg','_lo.png')+'"></img>').attr('style','position:absolute;opacity:'+(i>0?0:1));
          
          amud.svg[0].onload = function() {
            if (this.loaded) return;
            this.loaded = true;
            this.src = this.src.replace('_lo','');
            dfd.resolve(this);
          }

          this.$("#dafPanner").append(amud.svg)//.parent());
          
          /*$.when(dfd).then(function() {
            if (this.options.app.state.state.dafview.scrollTop) {
              this.$("#canvasHolder").scrollTop(this.options.app.state.state.dafview.scrollTop);
              this.$("#canvasHolder").scrollLeft(this.options.app.state.state.dafview.scrollLeft);
            }
          }.bind(this));*/
          
          $.when(dfd).then(this.doZoom.bind(this,this.options.profile.get('zoom'),true));
        },this);

        $.when.apply(null,svgsLoaded).then(function(){
          this.setupDafPoints(daf);
          
          this.daf.on('amudSwitched',function(amud) {
            this.options.popcorn.media.currentTime = this.daf.get('timePoints.'+amud.lineOffset);
          },this);

          $.when(this.canplay()).then(this.loaded.resolve);

          $.when(this.canplay()).then(() => {
            if (profile.lastViewed && profile.lastViewed[this.daf.id])
            this.options.popcorn.currentTime(profile.lastViewed[this.daf.id])
          });

          this.$("#canvasHolder").kinetic({
            moved:function(event) {
              //this.options.app.state.set('dafview','scrollTop',event.scrollTop);
              //this.options.app.state.set('dafview','scrollLeft',event.scrollLeft);
            }.bind(this)
          });

          document.addEventListener('webkitfullscreenchange',function() {
            this.doZoom(this.options.profile.get('zoom'));
          }.bind(this));

          document.addEventListener('mozfullscreenchange',function() {
            this.doZoom(this.options.profile.get('zoom'));
          }.bind(this));
       }.bind(this));
      }.bind(this));
    },
    setupDafPoints: function(daf) {
      var initial = true,
        popcorn = this.options.popcorn,
        currentAmud = daf.get('amudim')[0],
        timePoints = daf.get('timePoints');

      for(var i in timePoints) {
        if (timePoints[i] == null) {
          timePoints[i] = 0;
        }
      }
      window.popcorn = popcorn;
      this.currentAmud = currentAmud;

      popcorn.listen('pointerMoved', function(line) {
        var zoomFactor = 1+(zoom/10),
          lines = this.currentAmud.lines
          minY = lines[0].y * zoomFactor
          currentY =  lines[line].y * zoomFactor;

        var delta = minY - currentY;
        console.log('delta',delta);
        var maxY = this.$(".daf").height();
        var top = this.$("#canvasHolder").scrollTop();
        console.log('Amount left to bottom', 620 + top - currentY);
        
        if (currentY-top < 0) {
          this.$("#canvasHolder").animate({scrollTop:0});
        }
        else if (620 + top - currentY < 100) {
          if (delta >= 620-maxY) {
            this.$("#canvasHolder").animate({scrollTop:-delta});
          }
          else {
           this.$("#canvasHolder").animate({scrollTop:maxY}); 
          }
        }
      }.bind(this));
      
      var amudimOffsets = [0];

      for(var i = 1; i < daf.get('amudim').length; i++) {
         amudimOffsets.push(daf.get('amudim')[i-1].lines.length+amudimOffsets[i-1]);
      }

      for(var i = 0; i < daf.get('amudim').length; i++) {
        daf.get('amudim')[i].lineOffset = amudimOffsets[i];
        var options = {
          start: timePoints[amudimOffsets[i]] || 0,
          amud: daf.get('amudim')[i],
          dafView: this
        }

        if (daf.get('amudim')[i+1]) {
          options.end = timePoints[amudimOffsets[i+1]];
        }

        popcorn.amudSwap(options);
      }

      var totalLines = Math.min(_.reduce(daf.get('amudim'), function(memo,amud) {
        return memo+amud.lines.length;
      },0), timePoints.length);

      var amudimLength = daf.get('amudim').map(function(a) {
        return a.lines.length;
      });

      var amudimStart = daf.get('amudim').map(function(a) {
        return a.lineOffset;
      });

      var lineToAmud = [];
      
      for(var i = 0; i < amudimLength.length; i++) {
        for (var j = 0; j < amudimLength[i]; j++) {
          lineToAmud[j+amudimStart[i]] = i;
        }
      }

      for(var line = 0; line < totalLines; line++) {
       if (line > 0 && timePoints[line] < timePoints[line-1]) {
        break;
       }
       popcorn.timepoint({
          start:timePoints[line],
          end:(line == totalLines - 1 || timePoints[line] > timePoints[line+1]) ? timePoints[line]+1000 : timePoints[line + 1],
          canvas:this.canvas,
          dafView: this,
          line:line
        });

        var amud = daf.get('amudim')[lineToAmud[line]];
        
        var highlighter = new LineHighlighter({
          amud: amud,
          daf: this,
          line: amud.lines[line-amud.lineOffset],
          time: timePoints[line]
        });

        highlighter.$el.appendTo(this.$("#dafPanner"));
      }
    }
  });
	
  var LineHighlighter = Backbone.View.extend({
    events: {
      mouseover: function() {
        if (this.options.amud != this.options.daf.currentAmud) return;
        this.$el.css('opacity',.5);
      },
      mouseout: function() {
        if (this.options.amud != this.options.daf.currentAmud) return;
        this.$el.css('opacity',0);
      },
      click: function() {
        this.options.daf.options.popcorn.currentTime(this.options.time);
      }
    },
    initialize: function() {
      var zoomFactor = 1+(zoom/10);
      this.$el.css({
        position:'absolute',
        opacity:0,
        background:'#FFFF00',
        zIndex:10
      });

      this.$el.addClass('highlighter');
      this.$el.css('top', ((parseInt(this.options.line.y)-3-7) * zoomFactor));
      this.$el.css('left', (parseInt(this.options.line.x[1])) * zoomFactor);
      this.$el.data('top',(parseInt(this.options.line.y)-3-7));
      this.$el.data('left',(parseInt(this.options.line.x[1])));

      var width = (parseInt(this.options.line.x[0]) - parseInt(this.options.line.x[1]) + 6) * zoomFactor; 

      this.$el.css({'width':width,'height':15*zoomFactor});  
      this.$el.data('width',(parseInt(this.options.line.x[0]) - parseInt(this.options.line.x[1]) + 6));

      if (this.options.amud != this.options.daf.currentAmud) {
        this.$el.hide();
      }

      this.options.daf.on('amudSwitched',function(amud) {
        if (amud == this.options.amud) {
          this.$el.show();
        }
        else {
          this.$el.hide();
        }
      },this);
    }
  });

  return Dafview;
});

