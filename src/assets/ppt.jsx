import React, { useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";

const OpenPPT = () => {
    const [file, setFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const uploadAndConvert = async () => {
        if (!file) return alert("Please select a file!");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:5000/convert", formData);
            setPdfUrl(`http://localhost:5000/${res.data.pdfPath}`);
        } catch (err) {
            console.error(err);
            alert("Conversion failed!");
        }
    };

    return (
        <div className="flex flex-col items-center p-6">
            <input type="file" accept=".ppt,.pptx" onChange={handleFileChange} />
            <button onClick={uploadAndConvert} className="px-4 py-2 bg-blue-500 text-black rounded-md mt-4">
                Convert to PDF
            </button>

            {pdfUrl && (
                <div className="mt-6">
                    <h3 className="text-lg">Converted PDF:</h3>
                    <Document file={pdfUrl}>
                        <Page pageNumber={1} />
                    </Document>
                </div>
            )}
        </div>
    );
};

export default OpenPPT;
