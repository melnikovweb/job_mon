/**
 * BLOCK: Business Model 2 Columns
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';
import './parent';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

const TEMPLATE = [ [ 'core/columns', { columns: 2 }, [
	[ 'core/column', { width: '40%', className: 'first-column' }, [
		[ 'cgb/block-animation-blocks', { animationX: '-101%', duration: '1', fade: 'fade' }, [
			[ 'cgb/numbering-title', {} ],
			[ 'core/columns', { columns: 2 }, [
				[ 'core/column', { width: '60px' }, [] ],
				[ 'core/column', { width: '' }, [
					[ 'cgb/accordion', {} ],
				] ],
			] ],
		] ],
	] ],
	[ 'core/column', { width: '60%', className: 'second-column' }, [
		[ 'cgb/business-model-images', {} ],
	] ],
] ] ];

registerBlockType( 'cgb/business-model-columns-2', {
	title: __( 'Business Model 2 Columns' ),
	icon: 'columns',
	parent: [ 'cgb/business-model' ],
	category: 'monbat-blocks',
	keywords: [
		__( 'business' ),
		__( 'model' ),
		__( 'columns' ),
	],

	edit: ( ( { className } ) => {
		return (
			<div className={ `${ className !== 'undefined' ? className : '' } business-model--columns-2` }>
				<InnerBlocks template={ TEMPLATE } />
			</div>
		);
	} ),

	save: ( { className } ) => {
		return (
			<div className={ `${ className } business-model--columns-2` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
