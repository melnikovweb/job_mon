/**
 * BLOCK: Composed Images Item
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

registerBlockType( 'cgb/composed-image', {
	title: __( 'Composed Image' ),
	icon: 'image',
	category: 'monbat-blocks',
	parent: [ 'cgb/composed-images' ],
	keywords: [
		__( 'monbat' ),
		__( 'image' ),
		__( 'composed' ),
	],

	edit: ( { } ) => {
		return (
			<div className={ 'composed-images__item' }>
				<InnerBlocks template={ [ [ 'core/image', {} ] ] } templateLock="all" />
			</div>
		);
	},

	save: ( { } ) => {
		return (
			<div className={ 'composed-images__item' }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
