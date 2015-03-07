package com.saggezza.hackathon.data.source.models;


public class InningDetails {

    String InningDetailId;
    String MatchSummaryId;
    String Innings;
    String BattingTeam;

    public String getInningDetailId() {
        return InningDetailId;
    }

    public void setInningDetailId(String inningDetailId) {
        InningDetailId = inningDetailId;
    }

    public String getMatchSummaryId() {
        return MatchSummaryId;
    }

    public void setMatchSummaryId(String matchSummaryId) {
        MatchSummaryId = matchSummaryId;
    }

    public String getInnings() {
        return Innings;
    }

    public void setInnings(String innings) {
        Innings = innings;
    }

    public String getBattingTeam() {
        return BattingTeam;
    }

    public void setBattingTeam(String battingTeam) {
        BattingTeam = battingTeam;
    }
}
