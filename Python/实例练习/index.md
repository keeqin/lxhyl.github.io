
[python练习100题](https://www.runoob.com/python/python-100-examples.html)

代码地址`Python/实例练习/index.py`  

# 001   
有四个数字：1、2、3、4，能组成多少个互不相同且无重复数字的三位数？各是多少？  

```py
def learn001 ():
  ran = range(1,5)
  resultList = []
  for i in ran:
    for j in ran:
      for k in ran:
        if(i != j) and (j != k):
          resultList.append([i,j,k])
  print(resultList)
```

# 002   
企业发放的奖金根据利润提成。利润(I)低于或等于10万元时，奖金可提10%；利润高于10万元，低于20万元时，低于10万元的部分按10%提成，高于10万元的部分，可提成7.5%；20万到40万之间时，高于20万元的部分，可提成5%；40万到60万之间时高于40万元的部分，可提成3%；60万到100万之间时，高于60万元的部分，可提成1.5%，高于100万元时，超过100万元的部分按1%提成，从键盘输入当月利润I，求应发放奖金总数？  

```py
def learn002 ():
  profit = int(input('输入利润:'))
  result = 0
  money = [1000000,600000,400000,200000,100000,0]
  rate = [0.01,0.015,0.03,0.05,0.075,0.1]
  for index in range(len(money)):
    if profit > money[index]:
      result += (profit - money[index]) * rate[index]
      profit -= money[index] 
  print(result)
```

# 003 
一个整数，它加上100后是一个完全平方数，再加上168又是一个完全平方数，请问该数是多少？   

> 不会写数学题了...看了解析才恍然大悟

```py
def learn003():
  for i in range(1,85):
    if 168 % i == 0:
      j = 168 / i
      if i > j and (i + j) % 2 == 0 and (i - j) % 2 == 0:
        n = (i - j) / 2
        x = n * n- 100
        print(int(x))
```


# 004   
输入某年某月某日，判断这一天是这一年的第几天？  
```py
def isLeapYear(year:int) -> bool:
  if year % 400 ==0 or year % 4 == 0 and year % 100 != 0:
    return True
  else:
    return False

def learn004():
  inputY = int(input('年'))
  inputM = int(input('月'))
  inputD = int(input('日'))
  months = [None,0,31,59,90,120,151,181,212,243,273,304,334]
  day = months[inputM] + inputD
  if isLeapYear(inputY):
    day += 1
  return day
```

# 005   
输入三个整数x,y,z，请把这三个数由小到大输出  
```js
def learn005():
  numList = []
  for i in range(3):
    x = int(input('输入第' + str(i) + '个数:'))
    numList.append(x)
  numList.sort()
  return numList
print(learn005())   
```
> 进阶一下，输入任意多数字
```py
def learn005v2():
  numList = []
  flag = True
  while(flag):
    x = int(input('输入数字'))
    numList.append(x)
    isclose = input('是否结束? y/n:')
    if(isclose == 'y'):
      flag = False
  numList.sort()
  return numList  

print(learn005v2())
```


# 006   
斐波那契数列    
```py
def learn006(n):
  if n== 1 or n == 2:
    return 1
  return learn006(n-1) + learn006(n-2)
print(learn006(10))
```

# 007  
将一个列表的数据复制到另一个列表中  
```py
def learn007(list):
  return list[:]

print(learn007([1,2,3]))
```

# 008   
输出 9*9 乘法口诀表 
```py
def learn008():
  for i in range(1,9): 
    for j in range(1,i+1):
      print(str(i) + '*' + str(j) + '=' + str(i*j),end="   ")
    print('\n')
```