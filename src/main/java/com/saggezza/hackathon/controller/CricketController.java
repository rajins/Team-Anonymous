package com.saggezza.hackathon.controller;

import com.saggezza.hackathon.model.DataModel;
import com.saggezza.hackathon.model.JsonData;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/cricket/data")
public class CricketController {

    @RequestMapping(value = "/player", method = RequestMethod.GET)
    public JsonData player() {
        List<String> labels = new ArrayList<String>();
        labels.add("0");
        labels.add("10");
        labels.add("20");
        labels.add("30");
        labels.add("40");
        labels.add("50");

        List<String> series = new ArrayList<String>();
        series.add("Dhoni");
        series.add("Kholi");
        series.add("Dhawan");

        List<String> dhoni = new ArrayList<String>();
        dhoni.add("0");
        dhoni.add("0");
        dhoni.add("0");
        dhoni.add("15");
        dhoni.add("35");

        List<String> kholi = new ArrayList<String>();
        kholi.add("0");
        kholi.add("25");
        kholi.add("45");

        List<String> dhwan = new ArrayList<String>();
        dhwan.add("0");
        dhwan.add("35");
        dhwan.add("55");
        dhwan.add("75");

        List<List<String>> data = new ArrayList<List<String>>();
        data.add(dhoni);
        data.add(kholi);
        data.add(dhwan);

        DataModel dataModel = new DataModel(labels, series, data);

        return  JsonData.SUCCESS_RESPONSE(dataModel, "success");
    }
}
