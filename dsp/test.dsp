import("stdfaust.lib");
ctFreq = 500;
q = 5;
gain = 1;
process = no.noise*0.5 : fi.resonlp(ctFreq,q,gain);