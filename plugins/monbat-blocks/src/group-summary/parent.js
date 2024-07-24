/**
 * BLOCK: Group Summary
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

registerBlockType( 'cgb/group-summary', {
	title: __( 'Group Summary' ),
	icon: 'columns',
	category: 'monbat-blocks',
	keywords: [
		__( 'monbat' ),
		__( 'column' ),
		__( 'group' ),
		__( 'summary' ),
	],

	edit: ( ) => {
		return (
			<div className="group-summary">
				<InnerBlocks template={ [ [ 'cgb/group-summary-item' ] ] } allowedBlocks={ [ 'cgb/group-summary-item' ] } />
			</div>
		);
	},

	save: ( ) => {
		return (
			<div className="group-summary">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
