(function($) {
  Drupal.behaviors.backbone_user_manager = {
    attach: function() {
      // Create a Collection from a our backbone_user_manager view.
      var UserCollection = new Drupal.Backbone.Collections.UserIndex({});

      // ### AppView
      var AppView = Drupal.Backbone.View.extend({
        initialize: function() {
          Drupal.Backbone.View.prototype.initialize.apply(this);

          // The update flag is VERY important. It means that models are preserved and updated
          // when a fetch is done rather than being destroyed and recreated.
          console.log('works');
          UserCollection.fetch({update:true});
        },
      });

      // ### Start the app!
      //
      // Then all we need to do is create an instance of our app view!
      var app = new AppView();

    },
  };
})(jQuery);
