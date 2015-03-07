package com.saggezza.hackathon.data.source;


import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;

public class DataSource {
    public byte[] getFtpData(){
        String server = "182.71.247.58";
        int port = 21;
        String user = "hackathon";
        String pass = "hackathon";
        String fileName = "/Hackathon-Data/Cricket data - subset-100 records.json";

        FTPClient ftp = null;
        InputStream inputStream = null;
        BufferedInputStream bufferedInputStream = null;
        byte buffer[] = new byte[1024];
        int readCount;
        byte result[] = {91};
        int length = result.length;

        try{
            ftp = new FTPClient();
            ftp.connect(server, port);
            ftp.login(user, pass);
            ftp.enterLocalPassiveMode();
            ftp.setFileType(FTP.BINARY_FILE_TYPE);

            inputStream = ftp.retrieveFileStream(fileName);
            bufferedInputStream = new BufferedInputStream(inputStream);

            while( (readCount = bufferedInputStream.read(buffer)) > 0) {
                byte [] tmp = new byte[result.length + readCount];
                System.arraycopy(result,0,tmp,0,result.length);
                System.arraycopy(buffer,0,tmp,length,readCount);
                length += readCount;
                result = tmp;
            }

        }catch (IOException ex) {
            System.out.println("Error fetching data from FTP: " + ex.getMessage());
            ex.printStackTrace();
        } finally {
            try {
                if (ftp != null && ftp.isConnected()) {
                    ftp.logout();
                    ftp.disconnect();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }

            try {
                if (bufferedInputStream != null) {
                    bufferedInputStream.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }

            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException ex) {
                ex.printStackTrace();
            }
        }
        return result;
    }
}
