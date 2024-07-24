/**
 * BLOCK: Attachments
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'cgb/attachments', {
	title: __( 'Attachments' ),
	icon: 'portfolio',
	category: 'monbat-blocks',
	attributes: {
		title: {
			type: 'string',
			default: 'Attached',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'file' ),
		__( 'attachment' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		return (
			<div className="attachments">
				<RichText
					tagName="h2"
					placeholder="Title"
					allowedFormats={ [] }
					className="attachments__title sk-section-title"
					value={ attributes.title }
					onChange={ value => {
						setAttributes( { title: value } );
					} }
				/>
				<div className="attachments__media">
					<InnerBlocks template={ [ [ 'cgb/attachment-item' ] ] } allowedBlocks={ [ 'cgb/attachment-item' ] } />
				</div>
			</div>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className="attachments">
				{ attributes.title &&
					<RichText.Content tagName="h3" className="attachments__title sk-section-title" value={ attributes.title } />
				}
				<div className="attachments__media">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
