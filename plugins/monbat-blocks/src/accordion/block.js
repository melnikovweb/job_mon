/**
 * BLOCK: Accordion Item
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
const { RichText, InnerBlocks } = wp.blockEditor;

registerBlockType( 'cgb/accordion-item', {
	title: __( 'Accordion Item' ),
	icon: 'feedback',
	category: 'monbat-blocks',
	parent: [ 'cgb/accordion' ],
	attributes: {
		title: {
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
			<div className={ 'accordion__item' }>
				<RichText
					tagName="button"
					placeholder="Title"
					allowedFormats={ [] }
					className="accordion__title"
					value={ attributes.title }
					onChange={ value => {
						setAttributes( { title: value } );
					} }
				/>
				<div className={ 'accordion__content' }>
					<div className={ 'accordion__content-wrapp' }>
						<InnerBlocks template={ [ [ 'core/paragraph' ] ] } />
					</div>
				</div>
			</div>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'accordion__item' }>
				{ attributes.title &&
					<RichText.Content tagName="button" className="accordion__title" value={ attributes.title } />
				}
				<div className={ 'accordion__content' }>
					<div className={ 'accordion__content-wrapp' }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
