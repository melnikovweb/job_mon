/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './home-slider/block.js';
import './animation-block/block.js';
import './group-summary/block.js';
import './composed-images/block.js';
import './pop-up/block.js';
import './attachments/block.js';
import './accordion/block.js';
import './gallery-slider/block.js';
import './perfomance-indicators/block.js';
import './tabs/block.js';
import './metal-exchange/block.js';
import './numbering-title/block.js';
import './business-model-images/block.js';
import './business-model/block.js';
import './business-model-columns-3/block.js';
import './strategy-accordion/block.js';

wp.domReady( () => {
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'primary',
		label: 'Primary',
		isDefault: true,
	} );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'primary-simple',
		label: 'Primary Simple',
	} );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'secondary',
		label: 'Secondary',
	} );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'batteries',
		label: 'Batteries',
	} );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'download',
		label: 'Download',
	} );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'download',
		label: 'Download',
	} );

	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'icon-link',
		label: 'Icon Link',
	} );

	wp.blocks.registerBlockStyle( 'core/list', {
		name: 'default-list',
		label: 'Default',
		isDefault: true,
	} );

	wp.blocks.registerBlockStyle( 'core/list', {
		name: 'red-markers',
		label: 'Red Markers',
	} );

	wp.blocks.registerBlockStyle( 'core/list', {
		name: 'square',
		label: 'Square',
	} );

	wp.blocks.registerBlockStyle( 'core/heading', {
		name: 'section-title',
		label: 'Section Title',
	} );

	wp.blocks.registerBlockStyle( 'core/heading', {
		name: 'subtitle',
		label: 'Subtitle',
	} );

	wp.blocks.registerBlockStyle( 'core/heading', {
		name: 'custom-text-format',
		label: 'Custom Text Format',
	} );

	wp.blocks.registerBlockStyle( 'core/heading', {
		name: 'news-category',
		label: 'News Category',
	} );

	wp.blocks.registerBlockStyle( 'core/paragraph', {
		name: 'section-title',
		label: 'Section Title',
	} );

	wp.blocks.registerBlockStyle( 'core/paragraph', {
		name: 'subtitle',
		label: 'Subtitle',
	} );

	wp.blocks.registerBlockStyle( 'core/paragraph', {
		name: 'custom-text-format',
		label: 'Custom Text Format',
	} );

	wp.blocks.registerBlockStyle( 'core/paragraph', {
		name: 'news-category',
		label: 'News Category',
	} );

	wp.blocks.registerBlockStyle( 'core/paragraph', {
		name: 'topics',
		label: 'Topics',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'container',
		label: 'LG Container',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'container--md',
		label: 'MD Container',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'container--sm',
		label: 'SM Container',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'container--fl',
		label: 'FL Container',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'mobile-disable',
		label: 'Disable On Mobile',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'tablet-disable',
		label: 'Disable On Tablt',
	} );

	wp.blocks.registerBlockStyle( 'core/group', {
		name: 'desk-disable',
		label: 'Disable On Desktop',
	} );

	wp.blocks.registerBlockStyle( 'core/columns', {
		name: 'responce',
		label: 'Responce',
	} );

	wp.blocks.registerBlockStyle( 'core/table', {
		name: 'red-top',
		label: 'Red Top',
	} );

	wp.blocks.registerBlockStyle( 'core/table', {
		name: 'initial',
		label: 'Initial',
	} );

	wp.blocks.registerBlockStyle( 'core/table', {
		name: 'initial-small',
		label: 'Initial Small',
	} );

	wp.blocks.registerBlockStyle( 'cgb/accordion', {
		name: 'default',
		label: 'Default',
		isDefault: true,
	} );

	wp.blocks.registerBlockStyle( 'cgb/accordion', {
		name: 'popup',
		label: 'Popup',
	} );
} );
