/**
 * BLOCK: Animation Block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, BlockControls } = wp.editor;
const { PanelBody, SelectControl, Button, ToolbarGroup } = wp.components;
const { Fragment } = wp.element;

registerBlockType( 'cgb/pop-up', {
	title: __( 'PopUp Block' ),
	icon: 'testimonial',
	category: 'monbat-blocks',
	keywords: [
		__( 'popup' ),
		__( 'pop-up' ),
		__( 'pop up' ),
	],

	attributes: {
		popupType: {
			type: 'string',
			default: 'button',
		},
		popupBtnTitle: {
			type: 'string',
			default: 'Read More',
		},
		popupName: {
			type: 'string',
			default: 'Name',
		},
		popupRole: {
			type: 'string',
			default: 'Member',
		},
		imageID: {
			type: 'number',
		},
		imageUrl: {
			type: 'string',
			default: 'https://via.placeholder.com/220x230',
		},
		imageWidth: {
			type: 'string',
			default: '220',
		},
		imageHeight: {
			type: 'string',
			default: '233',
		},
		imageAlt: {
			type: 'string',
			default: 'Image',
		},
	},

	edit: ( { attributes, setAttributes } ) => {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'PopUp Type' ) }>
						<SelectControl
							label="PopUp Type"
							value={ attributes.popupType }
							options={ [
								{ label: 'Button', value: 'button' },
								{ label: 'Image', value: 'image' },
							] }
							onChange={ ( popupType ) => setAttributes( { popupType } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ `sk-popup sk-popup--${ attributes.popupType }` }>
					{ attributes.popupType === 'button' &&
						<button className="sk-btn sk-btn--primary sk-popup-trigger--btn" data-popup-trigger={ 'popup-triger' }>
							<RichText
								tagName="span"
								placeholder="Read More"
								allowedFormats={ [] }
								className="sk-btn__title"
								value={ attributes.popupBtnTitle }
								onChange={ value => {
									setAttributes( { popupBtnTitle: value } );
								} }
							/>
						</button>
					}
					{ attributes.popupType === 'image' &&
						<button className="sk-popup-trigger--image" data-popup-trigger={ 'popup-triger' }>
							<BlockControls>
								<ToolbarGroup>
									<MediaUploadCheck>
										<MediaUpload
											onSelect={ ( media ) => setAttributes( { imageUrl: media.url, imageAlt: media.alt, imageID: media.id, imageWidth: media.sizes.full.width, imageHeight: media.sizes.full.height } ) }
											type="image"
											render={ ( { open } ) => (
												<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
											) }
										/>
									</MediaUploadCheck>
								</ToolbarGroup>
							</BlockControls>
							{ attributes.imageUrl &&
								<figure className="sk-popup__media">
									<img className="sk-popup__img" src={ attributes.imageUrl } width={ attributes.imageWidth } height={ attributes.imageHeight } alt={ attributes.imageAlt } />
								</figure>
							}
						</button>
					}
					{ attributes.popupType === 'image' &&
						<RichText
							tagName="p"
							placeholder="Name"
							allowedFormats={ [] }
							className="sk-popup__name"
							value={ attributes.popupName }
							onChange={ value => {
								setAttributes( { popupName: value } );
							} }
						/>
					}
					{ attributes.popupType === 'image' &&
						<RichText
							tagName="p"
							placeholder="Role"
							allowedFormats={ [] }
							className="sk-popup__role"
							value={ attributes.popupRole }
							onChange={ value => {
								setAttributes( { popupRole: value } );
							} }
						/>
					}
					<div className={ 'sk-popup__content' }>
						<div className={ 'sk-container sk-container--lg' }>
							<button className={ 'sk-popup__close icon-close' } title={ __( 'Close' ) } data-popup-trigger={ 'popup-triger' }></button>
							<div className={ 'sk-popup__main' }>
								{ attributes.popupType === 'image' &&
									<RichText
										tagName="h3"
										placeholder="Name"
										allowedFormats={ [] }
										className="sk-popup__name--main is-style-section-title"
										value={ attributes.popupName }
										onChange={ value => {
											setAttributes( { popupName: value } );
										} }
									/>
								}
								{ attributes.popupType === 'image' &&
									<RichText
										tagName="p"
										placeholder="Role"
										allowedFormats={ [] }
										className="sk-popup__role--main"
										value={ attributes.popupRole }
										onChange={ value => {
											setAttributes( { popupRole: value } );
										} }
									/>
								}
								<InnerBlocks template={ [ [ 'core/heading', {} ] ] } />
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ `sk-popup sk-popup--${ attributes.popupType }` }>
				{ attributes.popupType === 'button' &&
					<button className="sk-btn sk-btn--primary sk-popup-trigger--btn" data-popup-trigger={ 'popup-triger' }>
						<RichText.Content tagName="span" className="sk-btn__title" value={ attributes.popupBtnTitle } />
					</button>
				}
				{ attributes.popupType === 'image' &&
					<button className="sk-popup-trigger--image" data-popup-trigger={ 'popup-triger' }>
						{ attributes.imageUrl &&
							<figure className="sk-popup__media">
								<img className="sk-popup__img" src={ attributes.imageUrl } width={ attributes.imageWidth } height={ attributes.imageHeight } alt={ attributes.imageAlt } />
							</figure>
						}
					</button>
				}
				{ attributes.popupType === 'image' && attributes.popupName &&
					<RichText.Content tagName="p" className="sk-popup__name" value={ attributes.popupName } />
				}
				{ attributes.popupType === 'image' && attributes.popupRole &&
					<RichText.Content tagName="p" className="sk-popup__role" value={ attributes.popupRole } />
				}
				<div className={ 'sk-popup__content' }>
					<div className={ 'sk-container sk-container--lg' }>
						<button className={ 'sk-popup__close icon-close' } title={ __( 'Close' ) } data-popup-trigger={ 'popup-triger' }></button>
						<div className={ 'sk-popup__main' }>
							{ attributes.popupType === 'image' && attributes.popupName &&
								<RichText.Content tagName="h3" className="sk-popup__name--main is-style-section-title" value={ attributes.popupName } />
							}
							{ attributes.popupType === 'image' && attributes.popupRole &&
								<RichText.Content tagName="p" className="sk-popup__role--main" value={ attributes.popupRole } />
							}
							<InnerBlocks.Content />
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
