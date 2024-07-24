/**
 * BLOCK: Accordion
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { InnerBlocks, RichText, InspectorControls } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { PanelBody } = wp.components;
const { Fragment } = wp.element;

registerBlockType( 'cgb/accordion', {
	title: __( 'Accordion' ),
	icon: 'list-view',
	category: 'monbat-blocks',
	attributes: {
		openText: {
			type: 'string',
			default: 'Expand All',
		},
		closeText: {
			type: 'string',
			default: 'Close All',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'accordion' ),
	],

	edit: ( { className, attributes, setAttributes } ) => {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Buttons Title' ) }>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">Open All Title</h3>
							<RichText
								tagName="p"
								placeholder="Title"
								allowedFormats={ [] }
								value={ attributes.openText }
								onChange={ value => {
									setAttributes( { openText: value } );
								} }
							/>
						</div>
						<div className="panelbody-wrapp">
							<h3 className="panelbody-title">Close All Title</h3>
							<RichText
								tagName="p"
								placeholder="Title"
								allowedFormats={ [] }
								value={ attributes.closeText }
								onChange={ value => {
									setAttributes( { closeText: value } );
								} }
							/>
						</div>
					</PanelBody>
				</InspectorControls>
				<div className={ `accordion ${ className }` }>
					<button className="accordion-toggle-all" data-state="close" data-open={ attributes.openText } data-close={ attributes.closeText }>{ attributes.openText }</button>
					<InnerBlocks template={ [ [ 'cgb/accordion-item' ] ] } allowedBlocks={ [ 'cgb/accordion-item' ] } />
				</div>
			</Fragment>
		);
	},

	save: ( { className, attributes } ) => {
		return (
			<div className={ `accordion ${ className }` }>
				<button className="accordion-toggle-all" data-state={ false } data-open={ attributes.openText } data-close={ attributes.closeText }>{ attributes.openText }</button>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
