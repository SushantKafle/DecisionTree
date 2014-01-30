var decisionTree = {
	
	values: [],
	classValues: [],
	classTypes: [],
	data: [],
	nClass:-1,
	splitIndex:-1,
	cName:-1,	
	dTree:[],
	
	calculate: function(_val,cName){
		
		this.values = _val;
		this.splitIndex = -1;
		this.cName = cName;
		var Dval = [[[0,-1],_val,cName,""]];
		id_count = 0;
		decisionTreeData = [];
		
		while(Dval.length !=0)
		{
			val = Dval.pop();
			value = val[1];
			[id,from] = val[0]; 
			names = val[2];
			type = val[3];
			check = this.pureVal(value);
			
			if(check[0])
			{
				decisionTreeData.push(['t',type,id_count,from,check[1]]);
				continue;
			}
			
			[classValues,classTypes,nClass] = this.getInfo(value,value[0].length-1);
			EntropyS = this.calcEntropyS(classValues,classTypes,nClass);
			
			if(value.length == 1)
				continue;
			
			_indexList=-1;
			_g=-1;
			_gainList = [];
	
			for(var i=0;i<value[0].length-1;i++)
			{
				entropy = [];			
				entropy = this.calcEntropy(this.getInfo(value,i),nClass,classValues,classTypes);
				gain = EntropyS - entropy;
				_gainList.push(gain);
				
				if(gain > _g)
				{
					_g = gain;
					_indexList = i;
				}
			}
			
			this.splitIndex = _indexList;
			decisionTreeData.push(['n',names[_indexList],id,from]);
			[_tval,_cName,ct]=this.filter(value,names,this.splitIndex);
			
			for(p=0;p<_tval.length;p++)
			{
				++id_count;
				Dval.push([[id_count,id],_tval[p],_cName,ct[p]]);
			}
		}
		return decisionTreeData;
	},
	
	pureVal: function(val)
	{
		testCase = val[0][val[0].length-1];
		
		for(i=0;i<val.length;i++)
		{
			if(testCase != val[i][val[0].length-1])
				return [false,""];
		}
		
		return [true,testCase];
	},
	
	filter: function(val,name,index)
	{
		if(index == -1)
			return [[val],[name]];
			
			
		[cv,ct,n] = this.getInfo(val,index);
		
		_val = [];
		_name = [];
		
		for(var j=0;j<n;j++)
		{
			_val[j]=[];
		}
		
		for(var i=0;i<val.length;i++)
		{
		
			for(var j=0;j<n;j++)
			{
				
				if(val[i][index] == ct[j])
				{
					_val[j].push(this.cut(val[i],index));
				}
			}
		}
		
		
		for(var i=0;i<name.length;i++)
		{
			if(i !=  index)
			{
				_name.push(name[i]);
			}
			
		}
		
		return [_val,_name,ct];
	},
	
	cut: function(val,index)
	{
		var t=[];
		
		for(var k=0;k<val.length;k++)
		{
			if(k != index)
				t.push(val[k]);
		}
		
		return t;
	
	},
	
	
	calcEntropy: function(arr,nClass,classValues,classTypes)
	{
		[_values,_types,_count] = arr;
		
		result = 0;
		
		for(var i=0;i<_count;i++)
		{
			_val = [];
			
			for(var j=0;j<_values.length;j++)
			{
				if(_values[j] == _types[i])
				{
					_val.push(j);
				}
			}
		
			
			total = _val.length;
			_prob = -1;
			count = [];
			
			for(var k=0;k<nClass;k++)
			{
				count.push(0);
			}
			
			
			for(var l=0;l<_val.length;l++) //values
			{
				for(var t=0;t<nClass;t++) //types
				{
					if(classValues[_val[l]] == classTypes[t])
					{
						count[t] +=1;
					}
				}
			}
			
			entropy = 0;
			
			for(var c=0;c<nClass;c++)
			{
				_prob = count[c] / total;
				
				if(_prob == 0)
					entropy += _prob;
				else		
					entropy += (_prob * Math.log2(_prob))
			}
			
			result += ((_val.length/_values.length)*entropy);
			
		}
		
		return -1*result;
	},
	
	calcEntropyS: function(_values,_types,_itr)
	{
		
		total = _values.length;
		_prob = [];
		count = []; //count[0] is the count of type[0]
		
		for(var k=0;k<_itr;k++)
		{
			count.push(0);
		}
		
		for(var i=0;i<_values.length;i++) //values
		{
			for(var j=0;j<_itr;j++) //types
			{
				if(_values[i] == _types[j])
				{
					count[j] +=1;
				}
			}
		}
		
		result = 0;
		
		for(var i=0;i<_itr;i++)
		{
			_prob[i] = count[i] / total;
			
			result += (_prob[i] * Math.log2(_prob[i]))
		}
	
		return -1*result;
	},
	
	getInfo: function(value,n)
	{
		nCol = n;
		
		val =[]; //Class Values
		_count=0;
		_types=[];
		
		for(var i=0;i<value.length;i++)
		{
			values=value[i][nCol];
			
			if(val.indexOf(values) == -1) //new
			{
				_count += 1;
				_types.push(values);
			}
			
			val[i]=values;
		}
		
		return [val,_types,_count];
	}
	

}
