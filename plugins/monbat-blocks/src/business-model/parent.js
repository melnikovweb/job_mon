/**
 * BLOCK: Business Model
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

registerBlockType( 'cgb/business-model', {
	title: __( 'Business Model' ),
	icon: 'images-alt',
	category: 'monbat-blocks',
	attributes: {
		modelType: {
			type: 'string',
		},
	},
	keywords: [
		__( 'business' ),
		__( 'model' ),
		__( 'columns' ),
	],

	edit: ( ) => {
		return (
			<div className="business-model">
				<InnerBlocks allowedBlocks={ [ 'cgb/business-model-columns-2', 'cgb/business-model-columns-3' ] } />
			</div>
		);
	},

	save: ( ) => {
		return (
			<div className="business-model">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
