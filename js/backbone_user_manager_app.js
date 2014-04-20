(function($) {
  $.fn.serializeObject = function() {
      var o = {};
      var a = this.serializeArray();
      $.each(a, function() {
          if (o[this.name] !== undefined) {
              if (!o[this.name].push) {
                  o[this.name] = [o[this.name]];
              }
              o[this.name].push(this.value || '');
          } else {
              o[this.name] = this.value || '';
          }
      });
      return o;
    };

  Drupal.behaviors.backbone_user_manager = {
    attach: function() {
      // Create a Collection from a our backbone_user_manager view.
      var UserCollection = new Drupal.Backbone.Collections.UserIndex({});

      // ### AppView
      var AppView = Drupal.Backbone.View.extend({
        el: '#backbone-user-manager-app',
        initialize: function() {
          Drupal.Backbone.View.prototype.initialize.apply(this);

          //Set Token to avoid Error: 'CSRF validation failed'.
          var session_token = '';
          $.ajax({
            url: Drupal.settings.basePath + "/services/session/token",
            type:"get",
            dataType:"text",
            error:function (jqXHR, textStatus, errorThrown) {
              alert(errorThrown);
            },
            success: function (token) {
                $.ajaxSetup({
                  beforeSend: function (request) {
                    request.setRequestHeader("X-CSRF-Token", token);
                  },
                });
            }
          });

          //Set messages area
          $('#header').after('<div id="messages"></div>');

        },
         // Render the list of users.
         render: function() {
          // The update flag is VERY important. It means that models are preserved and updated
          // when a fetch is done rather than being destroyed and recreated.
          var that = this;
          UserCollection.fetch({ update: true ,
            success: function (users) {
              var template = _.template($('#backbone-user-manager-list-template').html(), {users: users.models});
              that.$el.html(template);
            } });
        },
      });

      // ### Start the app!
      //
      // Then all we need to do is create an instance of our app view!
      var app = new AppView();

      var UserEditView = Backbone.View.extend({
        el: '#backbone-user-manager-app',
        render: function(options) {
          var that = this;
          if(options.uid) {
            that.user = new Drupal.Backbone.Models.User({uid: options.uid});
            that.user.fetch({
              success: function (user) {
                var template = _.template($('#backbone-user-manager-user-edit-template').html(), {user: user});
                that.$el.html(template);
              },
              error: function (user, response) {
                $("#messages").html('<div class="section clearfix"><div class="messages error">' + Drupal.t('Invalid User ID') + options.uid + '</div></div>');
                that.$el.html('<div><a href="#">'  + Drupal.t('Back to Home') + '</a></div>');
              },
            });
          } else {
            var template = _.template($('#backbone-user-manager-user-edit-template').html(), {user: null});
            that.$el.html(template);
          }
        },
        events: {
          'submit .edit-user-form': 'saveUser',
          'click .delete': 'deleteUser'
        },
        saveUser: function (ev) {
          var userDetails = $(ev.currentTarget).serializeObject();
          var user = new Drupal.Backbone.Models.User();
          user.save(userDetails, {
            success: function (user) {
              router.navigate('', {trigger:true});
            },
            error: function (user, response) {
              $("#messages").html('<div class="section clearfix"><div class="messages error">' + response.statusText + '</div></div>');
            },
          });
          return false;
        },
        deleteUser: function (ev) {
          this.user.destroy({
            success: function () {
              router.navigate('', {trigger:true});
            }
          });
          return false;
        },
      });

      var Router = Backbone.Router.extend({
        routes: {
          "": "home",
          "edit/:uid": "edit",
          "new": "edit",
        }
      });

      var router = new Router();
      router.on('route:home', function() {
        // render user list
        app.render();
      });

      var userEditView = new UserEditView();
      router.on('route:edit', function(uid) {
        userEditView.render({uid: uid});
      });

      Backbone.history.start();
    },
  };
})(jQuery);
