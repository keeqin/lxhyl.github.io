
python练习100题    

[题目来源](https://www.runoob.com/python/python-100-examples.html)    

[代码地址](https://github.com/lxhyl/lxhyl.github.io/blob/master/Python/%E5%AE%9E%E4%BE%8B%E7%BB%83%E4%B9%A0/index.py)  

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

# 009    

暂停一秒输出  
```py
def learn009(n):
  import time
  for i in range(n):
    print(i)
    time.sleep(1)  

# learn009(4)
```

# 010    
暂停一秒输出，并格式化当前时间    
```py
def learn010():
  import time
  nowtime = time.localtime(time.time())
  formatTime = time.strftime('%Y-%m-%d %H:%M:%S',nowtime)
  print('wait...')
  time.sleep(1)
  return formatTime

print(learn010())
```

# 011    
古典问题：有一对兔子，从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问每个月的兔子总数为多少？  

> 写出来才发现是斐波那契数列  

```py
def learn011():
  m = int(input('输入月数'))
  def fib(n):
    if n == 1 or n == 2:
      return 2
    return fib(n-1) + fib(n-2)
  return fib(m)

# print(learn011())
```


# 012   
判断101-200之间有多少个素数，并输出所有素数。  

```py
def learn012():
  def isPrime(num):
    from math import sqrt
    for i in range(2,int(sqrt(num))+1):
      if  num % i == 0:
        return False
    return True
  primeList = []
  total = 0
  for i in range(101,201):
     if isPrime(i):
       total += 1
       primeList.append(i)
  print('总共' + str(total) + '个')
  print('分别是:',primeList)

# learn012()
```

# 013  
打印出所有的"水仙花数"，所谓"水仙花数"是指一个三位数，其各位数字立方和等于该数本身。例如：153是一个"水仙花数"，因为153=1的三次方＋5的三次方＋3的三次方。
```py
def learn013():
  numlist = []
  for n in range(100,1000):
    i = n // 100
    j = (n - i * 100) // 10
    k = n - i*100 - j * 10
    if pow(i,3) + pow(j,3) + pow(k,3) == n:
      numlist.append(n)
  return numlist

# print(learn013())
```

# 014
将一个正整数分解质因数。例如：输入90,打印出90=2*3*3*5。  
```py
def learn014(n):
  numlist = []
  def findMin(num):
    if num == 0:
      return
    for i in range(2,num+1):
      if num % i == 0:
        numlist.append(str(i))
        return findMin(num // i)
      
  findMin(n)
  if len(numlist) == 1:
    print('%d = %d * %d'%(n,numlist[0],1))
  else:
    print('%d = %s' %(n,'*'.join(numlist)))
learn014(90)
```

分解质因数算法，从最小的质因数开始，递归就行。  

* python 中的`//`才是整除,需要注意下，否则`range`函数接收到float参数会失败  
* join方法是字符串才有的,所以列表转字符串应该使用`''.join(list)`  

