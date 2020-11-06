<?php  
/**
 * Plugin Name: Range Slider for Contact Form 7
 * Description: make slider part to range to make slide
 * Version: 1.0
 * Copyright:2019
*/
if (!defined('ABSPATH')) {
    die('-1');
}
if (!defined('OCCF7RS_PLUGIN_NAME')) {
    define('OCCF7CRS_PLUGIN_NAME', 'Range Slider for Contact Form 7');
}
if (!defined('OCCF7RS_PLUGIN_VERSION')) {
    define('OCCF7RS_PLUGIN_VERSION', '1.0.0');
}
if (!defined('OCCF7RS_PLUGIN_FILE')) {
    define('OCCF7RS_PLUGIN_FILE', __FILE__);
}
if (!defined('OCCF7RS_PLUGIN_DIR')) {
    define('OCCF7RS_PLUGIN_DIR',plugins_url('', __FILE__));
}
if (!defined('OCCF7RS_DOMAIN')) {
    define('OCCF7CRS_DOMAIN', 'occf7rs');
}
if (!class_exists('OCCF7RS')) {
  class OCCF7RS {
    protected static $OCCF7RS_instance;
   	//Load all includes files
  	function includes() {
  	 include_once('admin/rangeslider.php');
    }

  	function init() {
      add_action( 'admin_init', array($this, 'OCCF7RS_load_plugin'), 11 );
      add_action( 'admin_enqueue_scripts', array($this, 'OCCF7RS_load_admin'));
      add_action( 'wp_enqueue_scripts',  array($this, 'OCCF7RS_load_script_style'));
    }

  	function OCCF7RS_load_plugin() {
      if ( ! ( is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ) ) {
        add_action( 'admin_notices', array($this,'OCCF7RS_install_error') );
      }
    }

  	function OCCF7RS_install_error() {
      deactivate_plugins( plugin_basename( __FILE__ ) );
        ?>
        <div class="error">
          <p>
            <?php _e( 'cf7 calculator plugin is deactivated because it require <a href="plugin-install.php?tab=search&s=contact+form+7">Contact Form 7</a> plugin installed and activated.', OCCF7RS_DOMAIN ); ?>
          </p>
        </div>
        <?php
  	}

    //Add CSS on Backend
    function OCCF7RS_load_admin() {
      wp_enqueue_style( 'OCCF7RS-style-css', OCCF7RS_PLUGIN_DIR . '/includes/css/admin_style.css', false, '2.0.0' );
    }

    //Add JS and CSS on Frontend
    function OCCF7RS_load_script_style() {
     	wp_enqueue_script( 'OCCF7RS-front-js', OCCF7RS_PLUGIN_DIR . '/includes/js/front.js', false, '2.0.0' );
    	wp_enqueue_style( 'OCCF7RS-style-css', OCCF7RS_PLUGIN_DIR . '/includes/css/style.css', false, '2.0.0' );
    	wp_enqueue_script( 'jquery-ui' );
    	wp_enqueue_script( 'OCCF7RS-jquery-ui-js', OCCF7RS_PLUGIN_DIR .'/includes/js/jquery-ui.min.js', false, '2.0.0' );
    	wp_enqueue_style( 'OCCF7RS-jquery-ui-css', OCCF7RS_PLUGIN_DIR . '/includes/js/jquery-ui.min.css', false, '2.0.0' );
    	wp_enqueue_style( 'OCCF7RS-jquery-ui-slider-pips-css', OCCF7RS_PLUGIN_DIR .'/includes/js/jquery-ui-slider-pips.css', false, '2.0.0' ); 
    	wp_enqueue_script( 'OCCF7RS-jquery-ui-slider-pips-js', OCCF7RS_PLUGIN_DIR .'/includes/js/jquery-ui-slider-pips.js', false, '2.0.0' );
    }
    
    //Plugin Rating
    public static function do_activation() {
      set_transient('occfrs-first-rating', true, MONTH_IN_SECONDS);
    }

    public static function OCCF7RS_instance() {
      if (!isset(self::$OCCF7RS_instance)) {
        self::$OCCF7RS_instance = new self();
        self::$OCCF7RS_instance->init();
        self::$OCCF7RS_instance->includes();
      }
      return self::$OCCF7RS_instance;
    }

  }
  
  add_action('plugins_loaded', array('OCCF7RS', 'OCCF7RS_instance'));
  register_activation_hook(OCCF7RS_PLUGIN_FILE, array('OCCF7RS', 'do_activation'));
}