x- Seeing Stats about Pandas DataFrame
```python
df = pd.DataFrame( {"a" : [4, 5, 6], "b" : [7, 8, 9], "c" : [10, 11, 12]}, index = [1, 2, 3]) # has cols a, b, c and rows 1, 2, 3
df = pd.Series([-1, 10, 2], index = ["a", "b", "c"])
df.head(5), df.tail(5) # get first 5 or last 5 datapoints
df.info() #shows a bunch of useful information about # and type of cols and rows
elections.value_counts(["Year","Party"]) #tells how often a certain combination of rows occurs
elections["Party"].unique() #unique shows all unique values of a single column
```
- Extracting Data
```python
elections.loc[[87, 25, 179], ["Year", "Candidate", "Result"]] #extract data with specific rows and column labels
elections.loc[:,["Year": "Party"]] or elections[["Year" : "Party"]] or elections.iloc[:,[1 : 2]] #any row and range of colunns
validation = da.iloc[:int(len(da) * .2)] # split into val
train = da.iloc[int(len(da) * .2):] #split into train
new_elec = elections.set_index("Candidate") #set index lets us use loc (in the line below) to look through the row names 
teams_df_moneyball.set_index(["teamID", "yearID"]) #multi-index
new_elec.loc["Andrew Jackson", :] or elections[elections["Candidate"] == "Andrew Jackson"] #select all rows == "Andrew Jackson"
	- or elections.query("Candidate.isna()") #select all rows where Candidate doesn't have a value
df = df.loc[(df['yearID'] >= 1999) & (df['yearID'] <= 2004)] #chaining locs together
df = df.loc[df['teamID'].isin(["OAK","NYA", "BOS"]), ['yearID']] #use isin instead of = when working with dataframes
elections.loc[([True, False, True, False, True, False, False, False, False, False])] #extracts rows 0, 2, 4
df = tr_val_data.loc[(tr_val_data.duplicated())] #another use of boolean masks
(calls[["Lat", "Lon"]].isna()).sum() #check that all rows have valid data
```
- Editting DataFrame
```python
df = df.assign(new_col_name = new_col_values) # create new column in dataframe
df["winFrac"] = round(df["W"] / df["G"], 2) #creates column of rounded division (to hundredths place)
calls["Hour"] = calls["EVENTTM"].str.split(':').str[0].astype(int) #get number from a string and save in column 
calls_e = calls.groupby(["CVLEGEND", "OFFENSE"]).size() #how often each combo of ["CVLEGEND", "OFFENSE"] occurs 
babynames.groupby(["Year", "Sex"]).agg({"Count":"sum"}) # gives count of all males and females for each year
.agg("sum"), .agg("min"), .agg("mean"), .agg("first"), .agg("last"), .agg("count") #all allowed for group by
elections.sort_values("Count", ascending = False) #order by
pd.squeeze() #convert from data frame into series
```
- Working with 2 DataFrames
```python
pd.merge(left = df, right = df2, how = “inner”, left_on = "df1 primary key", right_on = "df2 matching primary key") 
```
![](https://lh7-rt.googleusercontent.com/slidesz/AGV_vUd1UN3Lr1jrOCaqjuDCvtEMZksCVpb0lFm_mrebxEtu-WHkMxZTdzmaO8VTSuotzo1QHl8Kgo5en60KM3PqNhX6RLHKFZUcKxFFXhzcfPh9XX0bz5YTBbpb3F9czd2hLl3ktYjX_E17aV7CNLDKliv-n78ZrcUh=s2048?key=OZZ10FgEahvjssrwQQc9rw)
- Visualizing Dataframes
```python
births['Maternal Smoker'].value_counts().plot(kind='bar') #built-in plotting
plt.bar(babies.index,babies.values); #matplotlib, nicer
sns.countplot(data = births, x = 'Maternal Smoker'); #seaborn, even nicer
px.histogram(births, x = 'Maternal Smoker', color = 'Maternal Smoker') #plotly, nicest
sns.histplot(births, x = 'Maternal Pregnancy Weight', stat = "density", kde=True); #Density Histograms are the most important
kde = true, #options for hist: smooth, 
p10= np.percentile(births['Maternal Pregnancy Weight'], 10) #get the 10th percentile (10% of data falls in quartile)
sns.displot(data=births, x = 'Birth Weight', kind = 'kde', y = 'Maternal Smoker') # overlay 2 distributions
sns.violinplot(data = births, x = 'Maternal Smoker', y = 'Birth Weight') #2 violin plots next to eachother (called stratifying)
# Entire workflow for barh plot:
plt.barh(calls_cvlegend.index, calls_cvlegend) # creates figure and axes
                                           or     ax = plt.gca()
plt.ylabel("Crime Category")               or     ax.set_ylabel("Crime Category")
plt.xlabel("Number of Calls")              or     ax.set_xlabel("Number of Calls")
plt.title("Number of Calls by Crime Type") or     ax.set_title("Axes methods: Number of Calls by Crime Type")

```
![[Screenshot 2024-09-09 at 4.14.14 PM.png]]

![[Pandas_Cheat_Sheet 2.pdf]]