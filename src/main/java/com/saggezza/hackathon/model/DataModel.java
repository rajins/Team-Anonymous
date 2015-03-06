package com.saggezza.hackathon.model;

import java.util.List;

public class DataModel {
    List<String> labels;
    List<String> series;
    List<List<String>> data;

    public DataModel(List<String> labels, List<String> series, List<List<String>> data) {
        this.labels = labels;
        this.series = series;
        this.data = data;
    }

    public DataModel() {
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<String> getSeries() {
        return series;
    }

    public void setSeries(List<String> series) {
        this.series = series;
    }

    public List<List<String>> getData() {
        return data;
    }

    public void setData(List<List<String>> data) {
        this.data = data;
    }
}
