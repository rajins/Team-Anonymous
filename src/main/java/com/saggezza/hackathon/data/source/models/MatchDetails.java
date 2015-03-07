package com.saggezza.hackathon.data.source.models;

public class MatchDetails {

    String MatchDetailsId;
    String InningDetailId;
    String Striker;
    String NonStriker;
    String Bowler;
    String BatsmanRuns;
    String ExtraRuns;
    String TotalRuns;
    String Delivery;
    String kind;
    String PlayerOut;
    String fielders;

    public String getMatchDetailsId() {
        return MatchDetailsId;
    }

    public void setMatchDetailsId(String matchDetailsId) {
        MatchDetailsId = matchDetailsId;
    }

    public String getInningDetailId() {
        return InningDetailId;
    }

    public void setInningDetailId(String inningDetailId) {
        InningDetailId = inningDetailId;
    }

    public String getStriker() {
        return Striker;
    }

    public void setStriker(String striker) {
        Striker = striker;
    }

    public String getNonStriker() {
        return NonStriker;
    }

    public void setNonStriker(String nonStriker) {
        NonStriker = nonStriker;
    }

    public String getBowler() {
        return Bowler;
    }

    public void setBowler(String bowler) {
        Bowler = bowler;
    }

    public String getBatsmanRuns() {
        return BatsmanRuns;
    }

    public void setBatsmanRuns(String batsmanRuns) {
        BatsmanRuns = batsmanRuns;
    }

    public String getExtraRuns() {
        return ExtraRuns;
    }

    public void setExtraRuns(String extraRuns) {
        ExtraRuns = extraRuns;
    }

    public String getTotalRuns() {
        return TotalRuns;
    }

    public void setTotalRuns(String totalRuns) {
        TotalRuns = totalRuns;
    }

    public String getDelivery() {
        return Delivery;
    }

    public void setDelivery(String delivery) {
        Delivery = delivery;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getPlayerOut() {
        return PlayerOut;
    }

    public void setPlayerOut(String playerOut) {
        PlayerOut = playerOut;
    }

    public String getFielders() {
        return fielders;
    }

    public void setFielders(String fielders) {
        this.fielders = fielders;
    }
}
