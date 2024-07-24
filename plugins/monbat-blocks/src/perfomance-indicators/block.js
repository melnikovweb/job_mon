/**
 * BLOCK: Perfomance Indicators Item
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
const { SelectControl } = wp.components;

registerBlockType( 'cgb/perfomance-indicators-item', {
	title: __( 'Perfomance Indicators Item' ),
	icon: 'slides',
	category: 'monbat-blocks',
	parent: [ 'cgb/perfomance-indicators' ],
	attributes: {
		title: {
			type: 'string',
		},

		boxTitle: {
			type: 'string',
		},

		boxNumber: {
			type: 'string',
		},

		number: {
			type: 'string',
		},

		legend: {
			type: 'string',
		},

		trend: {
			type: 'string',
			default: 'top',
		},
	},

	edit: ( { attributes, setAttributes } ) => {
		return (
			<div className={ 'perfomance-indicators__item' }>
				<RichText
					tagName="span"
					placeholder="Nox Number"
					allowedFormats={ [] }
					className="perfomance-indicators__box-number"
					value={ attributes.boxNumber }
					onChange={ value => {
						setAttributes( { boxNumber: value } );
					} }
				/>
				<RichText
					tagName="p"
					placeholder="Title"
					allowedFormats={ [ 'core/link' ] }
					className="perfomance-indicators__item-title"
					value={ attributes.title }
					onChange={ value => {
						setAttributes( { title: value } );
					} }
				/>
				<div className="perfomance-indicators__box">
					<RichText
						tagName="span"
						placeholder="First value"
						allowedFormats={ [] }
						className="perfomance-indicators__box-title"
						value={ attributes.boxTitle }
						onChange={ value => {
							setAttributes( { boxTitle: value } );
						} }
					/>
					<span className={ `perfomance-indicators__trend perfomance-indicators__trend--${ attributes.trend }` }>
						<SelectControl
							label="Trend"
							value={ attributes.trend }
							options={ [
								{ label: 'Hight', value: 'top' },
								{ label: 'Low', value: 'bottom' },
								{ label: 'Equal', value: 'equal' },
							] }
							onChange={ ( value ) => setAttributes( { trend: value } ) }
						/>
						{ attributes.trend && <span className={ `trend-icon trend-icon--${ attributes.trend }` }></span> }
						<RichText
							tagName="span"
							placeholder="Trend Number"
							allowedFormats={ [] }
							className="perfomance-indicators__number"
							value={ attributes.number }
							onChange={ value => {
								setAttributes( { number: value } );
							} }
						/>
					</span>
					<RichText
						tagName="span"
						placeholder="Legend"
						allowedFormats={ [] }
						className="perfomance-indicators__legend"
						value={ attributes.legend }
						onChange={ value => {
							setAttributes( { legend: value } );
						} }
					/>
				</div>
			</div>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'perfomance-indicators__item' }>
				{ attributes.boxNumber &&
					<RichText.Content tagName="span" className="perfomance-indicators__box-number" value={ attributes.boxNumber } />
				}
				{ attributes.title &&
					<RichText.Content tagName="p" className="perfomance-indicators__item-title" value={ attributes.title } />
				}
				<div className="perfomance-indicators__box">
					{ attributes.boxTitle &&
						<RichText.Content tagName="span" className="perfomance-indicators__box-title" value={ attributes.boxTitle } />
					}
					{ attributes.number &&
						<span className={ `perfomance-indicators__trend perfomance-indicators__trend--${ attributes.trend }` }>
							{ attributes.trend && <span className={ `trend-icon trend-icon--${ attributes.trend }` }></span> }
							<RichText.Content tagName="span" className="perfomance-indicators__number" value={ attributes.number } />
						</span>
					}
					{ attributes.legend &&
						<RichText.Content tagName="span" className="perfomance-indicators__legend" value={ attributes.legend } />
					}
				</div>
			</div>
		);
	},
} );
