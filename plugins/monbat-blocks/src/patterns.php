<?php 
// Register Pattern Category

register_block_pattern_category( 'monbat', array( 'label' => __( 'Monbat Blocks' ) ));

function removeCorePatterns() {
	unregister_block_pattern_category('featured');
}

add_action('init', 'removeCorePatterns');

// Include patterns
require_once plugin_dir_path( __FILE__ ) . '/patterns/topics.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/composed-images.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/group-summary.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/bord-of-directors.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/text-content.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/history-content.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/attachments.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/awards-table.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/columns-with-link.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/text-and-image.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/full-width-image.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/columns-with-background.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/perfomance-indicators.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/metal-exchange.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/business-model-columns-2.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/business-model-columns-3.php';
require_once plugin_dir_path( __FILE__ ) . '/patterns/strategy-accordion.php';
