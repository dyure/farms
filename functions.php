<?php
    // to remove admin bar
    add_filter('show_admin_bar', '__return_false');

    // to define some root directories
    define('D5_THEME_ROOT', get_template_directory_uri());
    define('D5_CSS_DIR', D5_THEME_ROOT . '/css');
    define('D5_JS_DIR', D5_THEME_ROOT . '/js');
    define('D5_IMG_DIR', D5_THEME_ROOT . '/img');
    define('D5_DOC_DIR', D5_THEME_ROOT . '/docs');

    add_action('wp_enqueue_scripts', function () {
        wp_enqueue_style('theme', get_stylesheet_uri());
        wp_enqueue_style('main', D5_CSS_DIR . '/styles.css');
        wp_enqueue_style('swiper_css', D5_CSS_DIR . '/swiper-bundle.min.css');

        wp_deregister_script('jquery-core');
        wp_register_script('jquery-core', D5_JS_DIR . '/jquery.js');
        wp_enqueue_script('jquery');
        wp_register_script('inputmask', D5_JS_DIR . '/jquery.inputmask.min.js');
        wp_enqueue_script('inputmask');
        wp_register_script('slick', D5_JS_DIR . '/slick.min.js');
        wp_enqueue_script('slick');
        wp_register_script('swiper', D5_JS_DIR . '/swiper-element-bundle.min.js');
        wp_enqueue_script('swiper');
        wp_register_script('my_jquery_scripts', D5_JS_DIR . '/script.js');
        wp_enqueue_script('my_jquery_scripts');
    });

    add_action('init', function() {
        // to add an image to any post
        add_theme_support('post-thumbnails');
    });  

    // Колонка миниатюры в списке записей админки
    add_filter('manage_posts_columns', 'posts_columns', 5);
    add_action('manage_posts_custom_column', 'posts_custom_columns', 5, 2);
    function posts_columns($defaults){
        $defaults['riv_post_thumbs'] = 'Миниатюра';
        return $defaults;
    }
    function posts_custom_columns($column_name, $id){
     if($column_name === 'riv_post_thumbs'){
            the_post_thumbnail( array(100, 100) );
        }
    }

    // удалим описание из заголовка для главной страницы
    add_filter( 'document_title_parts', function( $title ) {
        if( isset( $title['tagline'] ) ){
            unset( $title['tagline'] );
        }
        return $title;
    } );
?>