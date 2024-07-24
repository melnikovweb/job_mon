/**
 * BLOCK: Composed Images
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { InnerBlocks } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

const TEMPLATE = [ [ 'cgb/block-animation-blocks', {}, [ [ 'cgb/composed-image', { animationX: '-101%' } ] ] ], [ 'cgb/block-animation-blocks', {}, [ [ 'cgb/composed-image', { animationX: '101%' } ] ] ] ];

registerBlockType( 'cgb/composed-images', {
	title: __( 'Composed Images' ),
	icon: 'images-alt',
	category: 'monbat-blocks',
	keywords: [
		__( 'monbat' ),
		__( 'image' ),
		__( 'composed' ),
	],

	edit: ( ) => {
		return (
			<div className="composed-images">
				<div className="composed-images__wrapp sk-container sk-container--md">
					<InnerBlocks template={ TEMPLATE } templateLock="all" allowedBlocks={ [ 'cgb/composed-image', 'cgb/block-animation-blocks' ] } />
				</div>
			</div>
		);
	},

	save: ( ) => {
		return (
			<div className="composed-images">
				<div className="composed-images__wrapp sk-container sk-container--md">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
