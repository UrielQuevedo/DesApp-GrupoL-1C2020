import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
const UploadFileCSV = () => {


    const handleData = (event) => {
        event.preventDefault();
         
        // handlear file
    }
    return (
        <div>
            <form>
            <div class="form-group">
                <label for="files">Modificar productos mediante CSV </label>
                <input type="file" id="files" class="form-control" accept=".csv" required />
            </div>
    
            <Button
            className="form-group"
            type="submit"
            variant="contained"
            color="default"
            onClick={handleData}
            startIcon={<CloudUploadIcon />}
            >
            Subir archivo
            </Button>
    
            </form>
        </div>
    )
}

export default UploadFileCSV;