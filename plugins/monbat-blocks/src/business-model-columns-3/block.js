/**
 * BLOCK: Business Model 3 Columns
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.blockEditor;

const TEMPLATE = [ [ 'core/columns', { columns: 3 }, [
	[ 'core/column', { width: '30%', className: 'first-column', style: { spacing: { padding: { right: '30px' } } } }, [
		[ 'cgb/block-animation-blocks', { animationX: '-101%', duration: '1', fade: 'fade' }, [
			[ 'cgb/numbering-title', {} ],
			[ 'core/columns', { columns: 2 }, [
				[ 'core/column', { width: '60px' }, [] ],
				[ 'core/column', { width: '' }, [
					[ 'core/paragraph', {} ],
				] ],
			] ],
		] ],
	] ],
	[ 'core/column', { width: '40%', className: 'second-column' }, [
		[ 'cgb/business-model-images', {} ],
	] ],
	[ 'core/column', { width: '30%', className: 'third-column' }, [
		[ 'cgb/block-animation-blocks', { animationX: '101%', duration: '1', fade: 'fade' }, [
			[ 'cgb/numbering-title', {} ],
			[ 'core/paragraph', {} ],
		] ],
	] ],
] ] ];

registerBlockType( 'cgb/business-model-columns-3', {
	title: __( 'Business Model 3 Columns' ),
	icon: 'columns',
	category: 'monbat-blocks',
	keywords: [
		__( 'business' ),
		__( 'model' ),
		__( 'columns' ),
	],

	edit: ( ( { className } ) => {
		return (
			<div className={ `${ className } business-model--columns-3` }>
				<InnerBlocks template={ TEMPLATE } />
			</div>
		);
	} ),

	save: ( { className } ) => {
		return (
			<div className={ `${ className } business-model--columns-3` }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
