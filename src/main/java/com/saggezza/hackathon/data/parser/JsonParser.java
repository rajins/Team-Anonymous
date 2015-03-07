package com.saggezza.hackathon.data.parser;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.saggezza.hackathon.data.source.DataSource;
import com.saggezza.hackathon.data.source.models.MatchSummary;

public class JsonParser {
    public static Map<String, Object> parseCricketData(){
        Map<String, Object> cricketData = new HashMap<String, Object>();
        byte [] jsonData = new DataSource().getFtpData();
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
            List<MatchSummary> matchSummarys = objectMapper.readValue(jsonData, new TypeReference<List<MatchSummary>>() {});
        }catch (IOException ioe) {
            System.out.println("Exception while parsing json file " + ioe);
        }
        return cricketData;
    }

    public static void main(String[] args){
        parseCricketData();
    }
}
