/**
 * BLOCK: Numbering Title
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.blockEditor;

registerBlockType( 'cgb/numbering-title', {
	title: __( 'Numbering Title' ),
	icon: 'heading',
	category: 'monbat-blocks',
	attributes: {
		title: {
			type: 'string',
			default: '',
		},

		number: {
			type: 'string',
			default: '1',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'title' ),
		__( 'heading' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		return (
			<div className={ 'numbering-title' }>
				<RichText
					tagName="p"
					placeholder="1"
					allowedFormats={ [] }
					className="numbering-title__number"
					value={ attributes.number }
					onChange={ value => {
						setAttributes( { number: value } );
					} }
				/>
				<RichText
					tagName="h3"
					placeholder="Title"
					allowedFormats={ [] }
					className="numbering-title__title"
					value={ attributes.title }
					onChange={ value => {
						setAttributes( { title: value } );
					} }
				/>
			</div>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'numbering-title' }>
				{ attributes.number &&
					<RichText.Content tagName="p" className="numbering-title__number" value={ attributes.number } />
				}
				{ attributes.title &&
					<RichText.Content tagName="h3" className="numbering-title__title" value={ attributes.title } />
				}
			</div>
		);
	},
} );
