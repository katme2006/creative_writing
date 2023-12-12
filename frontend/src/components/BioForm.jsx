import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BioEditor = ({ bio, onBioChange }) => {
  // Configuration for ReactQuill toolbar
  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      [],
      ['clean']
    ],
    clipboard: {
      matchVisual: false, // Toggle to add extra line breaks when pasting HTML
    }
  };

  // Formats objects for setting up what to include in the toolbar
  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
  ];

  return (
    <ReactQuill
      value={bio}
      onChange={onBioChange}
      modules={modules}
      formats={formats}
      theme="snow"
    />
  );
};

export default BioEditor;
