Drupal User Manager with Backbone.js
============================

[![usermanager list](https://github.com/enzolutions/drupal-backbone-user-manager/raw/master/img/user_manager.png)](#features)

This project is a module for Drupal 7 to generate a user manager using Backbone.js

##Module Requirements
- jQuery Update (<a href="http://drupal.org/project/jquery_update">http://drupal.org/project/jquery_update</a>) version 7.x-2.3
- Services (<a href="http://drupal.org/project/services">http://drupal.org/project/services</a>) version 7.x-3.5
- Backbonejs (<a href="http://drupal.org/project/backbone">http://drupal.org/project/backbone</a>) version 7.x-1.x-dev

##Instalation

- Download Backbonejs from <a href="http://backbonejs.org">backbonejs.org</a> into libraries folders i.e sites/all/libraries/backbone/backbones.js (Tested version <a href="https://github.com/jashkenas/backbone/releases/tag/1.0.0">1.0</a>).
- Download Underscorejs from <a href="http://underscorejs.org">underscorejs.org</a> into libraries folders i.e sites/all/libraries/underscore/underscorejs.js (Tested version <a href="https://github.com/jashkenas/underscore/releases/tag/1.5.2">1.5.2</a>).
- Enable modules backbone_services and backbone.
- Enable services and rest_server
- Use jQuery Update to set jQuery version to 1.7

##Usage

- Access page <example.com>/backbone-user-manager.
- Only the user with correct rights can add or edit users.
