/**
 * BLOCK: Attachment Item
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
const { RichText, MediaUpload, InspectorControls } = wp.blockEditor;
const { Button, DateTimePicker, Popover, PanelBody } = wp.components;
const { useState, useEffect, Fragment } = wp.element;

const ALLOWED_MEDIA_TYPES = [ 'application' ];

registerBlockType( 'cgb/attachment-item', {
	title: __( 'Attachment Item' ),
	icon: 'media-document',
	category: 'monbat-blocks',
	parent: [ 'cgb/attachments' ],
	attributes: {
		title: {
			type: 'string',
			default: '',
		},

		documentUrl: {
			type: 'string',
			default: '',
		},

		uploadedToTitle: {
			type: 'string',
		},

		filesizeHumanReadable: {
			type: 'string',
		},

		dateFormatted: {
			type: 'string',
			default: new Date().toISOString(),
		},

		subtype: {
			type: 'string',
		},

	},
	keywords: [
		__( 'monbat' ),
		__( 'file' ),
		__( 'attachment' ),
		__( 'document' ),
	],

	edit: ( { attributes, setAttributes } ) => {
		const [ openDatePopup, setOpenDatePopup ] = useState( false );
		const [ date, setState ] = useState( attributes.dateFormatted );
		useEffect( () => setAttributes( { dateFormatted: date } ), [ date ] );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Upload Document' ) }>
						<MediaUpload
							onSelect={ ( media ) => setAttributes( { documentUrl: media.url, subtype: media.filename.split( '.' ).pop(), uploadedToTitle: media.title, filesizeHumanReadable: media.filesizeHumanReadable } ) }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							render={ ( { open } ) => (
								<Button onClick={ open } className="components-button is-primary">Open Media Library</Button>
							) }
						/>
						{ attributes.uploadedToTitle &&
							<p>{ attributes.uploadedToTitle }</p>
						}
					</PanelBody>
					<PanelBody title={ __( 'Update Publish Date' ) }>
						<Button isLink={ true } onClick={ () => setOpenDatePopup( ! openDatePopup ) }>{ __( 'Click here to chage date.' ) }</Button>
						{ openDatePopup && (
							<Popover onClose={ setOpenDatePopup.bind( null, false ) }>
								<DateTimePicker
									currentDate={ date }
									onChange={ ( newDate ) => setState( newDate ) }
									is12Hour={ false }
								/>
							</Popover>
						) }
					</PanelBody>
				</InspectorControls>
				<div className={ 'attachments__item article-document' }>
					<p className="article-document__title">
						<a className="article-document__url" onClick={ ( e ) => e.preventDefault() } href={ attributes.documentUrl } target="_blank" rel="noreferrer noopener">
							<RichText
								tagName="span"
								placeholder="Title"
								allowedFormats={ [] }
								value={ attributes.title }
								className="article-document__text"
								onChange={ value => {
									setAttributes( { title: value } );
								} }
							/>
						</a>
					</p>
					<div className="article-document__info">
						{ attributes.dateFormatted &&
							<div className="article-document__date">{ new Date( attributes.dateFormatted ).toLocaleDateString( 'en-GB' ) }</div>
						}
						<div className="article-document__type">{ attributes.subtype }</div>
						<a className="article-document__icon" href={ attributes.documentUrl } target="_blank" download rel="noreferrer noopener"><span>{ __( 'Download', 'mobbat' ) }</span></a>
					</div>
				</div>
			</Fragment>
		);
	},

	save: ( { attributes } ) => {
		return (
			<div className={ 'attachments__item article-document' }>
				{ attributes.documentUrl &&
					<p className="article-document__title">
						<a className="article-document__url" href={ attributes.documentUrl } target="_blank" rel="noreferrer noopener">
							<RichText.Content tagName="span" className="article-document__text" value={ attributes.title } />
						</a>
					</p>
				}
				<div className="article-document__info">
					{ attributes.dateFormatted &&
						<div className="article-document__date">{ new Date( attributes.dateFormatted ).toLocaleDateString( 'en-GB' ) }</div>
					}
					{ attributes.subtype &&
						<div className="article-document__type">{ attributes.subtype }</div>
					}
					{ attributes.documentUrl &&
						<a className="article-document__icon" href={ attributes.documentUrl } target="_blank" download rel="noreferrer noopener"><span>{ __( 'Download', 'mobbat' ) }</span></a>
					}
				</div>
			</div>
		);
	},
} );
