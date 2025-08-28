import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { Search, Shield, AlertTriangle, Download, Eye, Globe, User, Mail } from 'lucide-react';

const PrivacyChecker = () => {
  const [inputType, setInputType] = useState('email');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const { toast } = useToast();

  const handleCheck = async () => {
    if (!inputValue.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter an email, username, or domain to check.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/privacy-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: inputType,
          value: inputValue.trim()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to check privacy exposure');
      }

      const data = await response.json();
      setResults(data);
      
      toast({
        title: "Privacy Check Complete",
        description: `Your privacy exposure score is ${data.score}/100`,
      });
    } catch (error) {
      toast({
        title: "Check Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (format) => {
    if (!results) return;
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/generate-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results,
          format,
          inputType,
          inputValue
        })
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `icu-privacy-report-${Date.now()}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast({
        title: "Report Downloaded",
        description: `Your ${format.toUpperCase()} report has been downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const getScoreColor = (score) => {
    if (score < 30) return 'text-green-400';
    if (score < 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBg = (score) => {
    if (score < 30) return 'from-green-500 to-green-600';
    if (score < 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  return (
    <section className="min-h-screen py-20 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-orbitron mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Privacy Mirror
          </h2>
          <p className="text-xl text-cyan-300/80 max-w-2xl mx-auto">
            Check your digital exposure across the web using advanced OSINT techniques
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30 mb-8">
            <CardHeader>
              <CardTitle className="text-cyan-300 font-orbitron flex items-center gap-2">
                <Search className="h-5 w-5" />
                Privacy Exposure Check
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Tabs value={inputType} onValueChange={setInputType} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800/50">
                  <TabsTrigger value="email" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="username" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
                    <User className="h-4 w-4 mr-2" />
                    Username
                  </TabsTrigger>
                  <TabsTrigger value="domain" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300">
                    <Globe className="h-4 w-4 mr-2" />
                    Domain
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-6 flex gap-4">
                  <Input
                    placeholder={`Enter your ${inputType}...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-gray-900/50 border-cyan-400/30 text-white placeholder-gray-400 focus:border-cyan-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
                  />
                  <Button
                    onClick={handleCheck}
                    disabled={loading}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 px-8 font-orbitron"
                  >
                    {loading ? 'Scanning...' : 'Check Now'}
                  </Button>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        {results && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Privacy Score */}
            <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-800 to-gray-900 flex items-center justify-center mb-4 mx-auto border-4 border-cyan-400/30">
                      <div className={`text-4xl font-bold font-orbitron ${getScoreColor(results.score)}`}>
                        {results.score}
                      </div>
                    </div>
                    <Badge className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${getScoreBg(results.score)} text-white`}>
                      {results.score < 30 ? 'Low Risk' : results.score < 60 ? 'Medium Risk' : 'High Risk'}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold font-orbitron text-white mb-2">Privacy Exposure Score</h3>
                  <Progress value={results.score} className="w-full max-w-md mx-auto h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* WHOIS Results */}
              {results.whois && (
                <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-300 font-orbitron flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Domain Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Registered:</span>
                        <Badge variant={results.whois.registered ? "destructive" : "default"}>
                          {results.whois.registered ? "Yes" : "No"}
                        </Badge>
                      </div>
                      {results.whois.registrar && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Registrar:</span>
                          <span className="text-white">{results.whois.registrar}</span>
                        </div>
                      )}
                      {results.whois.creation_date && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Created:</span>
                          <span className="text-white">{results.whois.creation_date}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sherlock Results */}
              {results.sherlock && (
                <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-300 font-orbitron flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Username Found On
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {results.sherlock.length > 0 ? (
                        results.sherlock.map((platform, index) => (
                          <Badge key={index} variant="destructive" className="mr-2 mb-2">
                            {platform}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-400">No public profiles found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Holehe Results */}
              {results.holehe && (
                <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30">
                  <CardHeader>
                    <CardTitle className="text-cyan-300 font-orbitron flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Registered On
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {results.holehe.length > 0 ? (
                        results.holehe.map((platform, index) => (
                          <Badge key={index} variant="destructive" className="mr-2 mb-2">
                            {platform}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-400">No registrations found</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Summary */}
              <Card className="bg-black/40 backdrop-blur-md border-cyan-400/30">
                <CardHeader>
                  <CardTitle className="text-cyan-300 font-orbitron flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Risk Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p className="text-gray-300">{results.summary}</p>
                    <div className="flex gap-2 mt-4">
                      <Button
                        onClick={() => downloadReport('pdf')}
                        variant="outline"
                        size="sm"
                        className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        PDF Report
                      </Button>
                      <Button
                        onClick={() => downloadReport('html')}
                        variant="outline"
                        size="sm"
                        className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        HTML Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PrivacyChecker;