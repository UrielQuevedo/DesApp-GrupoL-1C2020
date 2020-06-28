import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import { parse } from 'papaparse';

const UploadFileCSV = () => {
    
    const readFile = () => {
        parse(document.getElementById('files').files[0], {
            download: true,
            header: true,
            complete: results => {
                console.log(results.data);
            }
        });
    }
    
    return (
        <div>
            <form>
            <div class="form-group">
                <label for="files">Modificar productos mediante CSV </label>
                <input type="file" id="files" class="form-control" accept=".csv" required />
            </div>
    
            <div class="form-group">
		        <button type="submit" id="submit-file" class="btn btn-primary" onClick={readFile}>Upload File</button>
	        </div>
            
        
            {/*<Button
            className="form-group"
            type="submit"
            variant="contained"
            color="default"
            onClick={handleData}
            startIcon={<CloudUploadIcon />}
            >
            Subir archivo
            </Button>
            */}
    
            </form>
        </div>
    )
}

export default UploadFileCSV;