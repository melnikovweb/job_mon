/**
 * BLOCK: Group Summary Item
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
const { RichText } = wp.blockEditor;

registerBlockType( 'cgb/group-summary-item', {
	title: __( 'Group Summary Item' ),
	icon: 'slides',
	category: 'monbat-blocks',
	parent: [ 'cgb/group-summary' ],
	attributes: {
		title: {
			type: 'string',
			default: '',
		},

		number: {
			type: 'string',
			default: '',
		},

		percent: {
			type: 'string',
			default: '',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'column' ),
		__( 'group' ),
		__( 'summary' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		return (
			<div className={ 'group-summary__item' }>
				<RichText
					tagName="p"
					placeholder="Title"
					allowedFormats={ [] }
					className="group-summary__title"
					value={ attributes.title }
					onChange={ value => {
						setAttributes( { title: value } );
					} }
				/>
				<RichText
					tagName="p"
					placeholder="53 575"
					allowedFormats={ [] }
					className="group-summary__number"
					value={ attributes.number }
					onChange={ value => {
						setAttributes( { number: value } );
					} }
				/>
				<RichText
					tagName="p"
					placeholder="10.8%"
					allowedFormats={ [] }
					className="group-summary__percent"
					value={ attributes.percent }
					onChange={ value => {
						setAttributes( { percent: value } );
					} }
				/>
			</div>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'group-summary__item' }>
				{ attributes.title &&
					<RichText.Content tagName="p" className="group-summary__title" value={ attributes.title } />
				}
				{ attributes.number &&
					<RichText.Content tagName="p" className="group-summary__number" value={ attributes.number } />
				}
				{ attributes.percent &&
					<RichText.Content tagName="p" className="group-summary__percent" value={ attributes.percent } />
				}
			</div>
		);
	},
} );
