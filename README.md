
## 环境配置:

WINDOWS
(Thanks to Graham Wideman)

Install Java (version 1.6 or higher)
Download antlr-4.5.3-complete.jar (or whatever version) from http://www.antlr.org/download/ Save to your directory for 3rd party Java libraries, say C:\Javalib
Add antlr-4.5.3-complete.jar to CLASSPATH, either:
Permanently: Using System Properties dialog > Environment variables > Create or append to CLASSPATH variable
Temporarily, at command line:
SET CLASSPATH=.;C:\Javalib\antlr-4.6-complete.jar;%CLASSPATH%
Create short convenient commands for the ANTLR Tool, and TestRig, using batch files or doskey commands:
Batch files (in directory in system PATH) antlr4.bat and grun.bat
java org.antlr.v4.Tool %*
java org.antlr.v4.gui.TestRig %*


## 元数据

# view

# model

# action

# rule
