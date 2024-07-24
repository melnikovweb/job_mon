<?php

$composer_autoload = __DIR__ . '/vendor/autoload.php';
if ( file_exists( $composer_autoload ) ) {
	require_once $composer_autoload;
}

// Skeleton activate core
new SkeletonTheme\Core(array(
	'fieldsResolver' => false,
	'blocksResolver' => true,
	'dashboardCustomizer' => true,
	'requireFolders' => ['functions', 'stock-data'],
	'flexibleContentResolver' => false
));
