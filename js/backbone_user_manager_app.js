(function($) {
  Drupal.behaviors.backbone_user_manager = {

    attach: function() {
      // Create a Collection from a our backbone_user_manager view.
      var UserCollection = new Drupal.Backbone.Collections.UserIndex({});

      // ### AppView
      var AppView = Drupal.Backbone.View.extend({
        el: '#backbone-user-manager-app',
        initialize: function() {
          Drupal.Backbone.View.prototype.initialize.apply(this);
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
      app.render();

    },
  };
})(jQuery);
