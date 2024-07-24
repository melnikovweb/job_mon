/**
 * BLOCK: Strategy Accordion
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { InnerBlocks, RichText } = wp.blockEditor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'cgb/strategy-accordion', {
	title: __( 'Strategy Accordion' ),
	icon: 'list-view',
	category: 'monbat-blocks',
	attributes: {
		title: {
			type: 'string',
			default: '',
		},
		firstTitle: {
			type: 'string',
			default: '',
		},
		secondTitle: {
			type: 'string',
			default: '',
		},
		thirdTitle: {
			type: 'string',
			default: '',
		},
	},
	keywords: [
		__( 'monbat' ),
		__( 'accordion' ),
		__( 'strategy' ),
	],

	edit: ( { className, attributes, setAttributes } ) => {
		return (
			<div className={ `strategy-accordion ${ className }` }>
				<div className="strategy-accordion__heading--mob">
					<RichText
						tagName="h2"
						placeholder="Title"
						allowedFormats={ [] }
						className="strategy-accordion__heading"
						value={ attributes.title }
						onChange={ value => {
							setAttributes( { title: value } );
						} }
					/>
				</div>
				<div className="strategy-accordion__heading--desk strategy-accordion__heading--desk-left">
					<RichText
						tagName="h2"
						placeholder="Title"
						allowedFormats={ [] }
						className="strategy-accordion__heading"
						value={ attributes.title }
						onChange={ value => {
							setAttributes( { title: value } );
						} }
					/>
				</div>
				<div className="strategy-accordion__heading--desk strategy-accordion__heading--desk-right">
					<RichText
						tagName="h2"
						placeholder="Title"
						allowedFormats={ [] }
						className="strategy-accordion__heading"
						value={ attributes.title }
						onChange={ value => {
							setAttributes( { title: value } );
						} }
					/>
				</div>
				<div className="strategy-accordion__main">
					<div className="strategy-accordion__header">
						<div className="strategy-accordion__column first-column">
							<RichText
								tagName="p"
								placeholder="Title"
								allowedFormats={ [] }
								className="strategy-accordion__column-title"
								value={ attributes.firstTitle }
								onChange={ firstTitle => {
									setAttributes( { firstTitle } );
								} }
							/>
						</div>
						<div className="strategy-accordion__column second-column">
							<RichText
								tagName="p"
								placeholder="Title"
								allowedFormats={ [] }
								className="strategy-accordion__column-title"
								value={ attributes.secondTitle }
								onChange={ secondTitle => {
									setAttributes( { secondTitle } );
								} }
							/>
						</div>
						<div className="strategy-accordion__column third-column">
							<RichText
								tagName="p"
								placeholder="Title"
								allowedFormats={ [] }
								className="strategy-accordion__column-title"
								value={ attributes.thirdTitle }
								onChange={ thirdTitle => {
									setAttributes( { thirdTitle } );
								} }
							/>
						</div>
					</div>
					<div className="strategy-accordion__wrapp">
						<div className="strategy-accordion__bg"></div>
						<InnerBlocks template={ [ [ 'cgb/strategy-accordion-item' ] ] } allowedBlocks={ [ 'cgb/strategy-accordion-item' ] } />
					</div>
				</div>
			</div>
		);
	},

	save: ( { className, attributes } ) => {
		return (
			<div className={ `strategy-accordion ${ className }` }>
				{ attributes.title &&
					<div className="strategy-accordion__heading--mob">
						<RichText.Content tagName="h2" className="strategy-accordion__heading" value={ attributes.title } />
					</div>
				}
				{ attributes.title &&
					<div className="strategy-accordion__heading--desk strategy-accordion__heading--desk-left">
						<RichText.Content tagName="h2" className="strategy-accordion__heading" value={ attributes.title } />
						<div className="strategy-accordion__heading-arrow"></div>
					</div>
				}
				{ attributes.title &&
					<div className="strategy-accordion__heading--desk strategy-accordion__heading--desk-right">
						<div className="strategy-accordion__heading-arrow"></div>
						<RichText.Content tagName="h2" className="strategy-accordion__heading" value={ attributes.title } />
					</div>
				}
				<div className="strategy-accordion__main">
					<div className="strategy-accordion__header">
						{ attributes.firstTitle &&
							<div className="strategy-accordion__column first-column">
								<RichText.Content tagName="p" className="strategy-accordion__column-title" value={ attributes.firstTitle } />
							</div>
						}
						{ attributes.secondTitle &&
							<div className="strategy-accordion__column second-column">
								<RichText.Content tagName="p" className="strategy-accordion__column-title" value={ attributes.secondTitle } />
							</div>
						}
						{ attributes.thirdTitle &&
							<div className="strategy-accordion__column third-column">
								<RichText.Content tagName="p" className="strategy-accordion__column-title" value={ attributes.thirdTitle } />
							</div>
						}
					</div>
					<div className="strategy-accordion__wrapp">
						<div className="strategy-accordion__bg"></div>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
