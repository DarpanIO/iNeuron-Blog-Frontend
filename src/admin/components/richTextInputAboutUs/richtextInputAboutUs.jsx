import React, { useRef,useContext,useLayoutEffect } from "react";
import JoditEditor from "jodit-react";
import {Jodit} from 'jodit'
import aboutContext from "../../../context/aboutUs/aboutContext";
import articleContext from "../../../context/articles/articleContext";
import "./richtextInput.css";
const config = {
  zIndex: 0,
  readonly: false,
  // activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
  toolbarButtonSize: 'middle',
  theme: 'default',
  // enableDragAndDropFileToEditor: true,
  saveModeInCookie: false,
  spellcheck: true,
  editorCssClass: false,
  triggerChangeEvent: true,
  // height: 220,
  direction: 'ltr',
  language: 'en',
  debugLanguage: false,
  i18n: 'en',
  tabIndex: -1,
  toolbar: true,
  enter: 'P',
  useSplitMode: false,
  colorPickerDefaultTab: 'background',
  imageDefaultWidth: 100,
  // removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
  events: {},
  textIcons: false,
  // uploader: {
  //   insertImageAsBase64URI: true
  // },
  placeholder: 'Enter Article Body Here',
  showXPathInStatusbar: false,
  extraButtons: ["uploadImage"]
}
const RichTextInputAboutUs = ({isVideo ,value,onChange,description}) => {
  const aboutEditor = useRef(null);
  const context = useContext(aboutContext);
  const contextArticle = useContext(articleContext);
  const {setDescription} = context;
  const {uploadFileGetUrl} = contextArticle;

  
  useLayoutEffect(() => {
    return uploadImageButton()  
  }, [])
  
  const uploadImageButton = () => {
    Jodit.defaultOptions.controls.uploadImage = {
        name: 'Upload image to AWS',
        tooltip: 'Upload Image',
        iconURL: process.env.PUBLIC_URL + '/otherIcons/upload-image-icon.svg',
        exec: (async (editor) => {
            await imageUpload(editor)
        })
    };
}

const imageUpload = (editor) => {

  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async function () {

      const imageFile = input.files[0];

      if (!imageFile) {
          return;
      }

      if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
          return;
      }

      const imageInfo = await uploadFileGetUrl(input);

      if(imageInfo){
        insertImage(editor, imageInfo);
      }
  };
}

const insertImage = (editor, url) => {
  const image = editor.selection.j.createInside.element('img');
  image.setAttribute('src', url);
  image.setAttribute('height', "100px");
  editor.selection.insertNode(image);
}
  // var editor = Jodit.make('#editor');
  // editor.value = '<p>start</p>';
  // description=article.description
  return (
    <JoditEditor
      ref={aboutEditor}
      onChange={(content) => {
        setDescription(content)
      }}
      value={value}
      config={config}
    />
  );
};

export default RichTextInputAboutUs;
