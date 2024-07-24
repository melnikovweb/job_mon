/**
 * BLOCK: Strategy Accordion Item
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

registerBlockType( 'cgb/strategy-accordion-item', {
	title: __( 'Strategy Accordion Item' ),
	icon: 'feedback',
	category: 'monbat-blocks',
	parent: [ 'cgb/strategy-accordion' ],
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'accordion' ),
		__( 'strategy' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		return (
			<div className={ 'strategy-accordion__item' }>
				<RichText
					tagName="button"
					placeholder="Title"
					allowedFormats={ [] }
					className="strategy-accordion__title"
					value={ attributes.title }
					onChange={ value => {
						setAttributes( { title: value } );
					} }
				/>
				<div className={ 'strategy-accordion__content' }>
					<div className={ 'strategy-accordion__content-wrapp' }>
						<InnerBlocks template={ [ [ 'core/paragraph' ] ] } />
					</div>
				</div>
			</div>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'strategy-accordion__item' }>
				{ attributes.title &&
					<RichText.Content tagName="button" className="strategy-accordion__title" value={ attributes.title } />
				}
				<div className={ 'strategy-accordion__content' }>
					<div className={ 'strategy-accordion__content-wrapp' }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
