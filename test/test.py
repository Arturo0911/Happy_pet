# primer nubers verify  7427466391  7427466391




"""count = 0
n = int(input("number: "))
for i in range(2,n):
    for j in range(2,i):
        if(i%j==0):
            count = count + 1
    if(count > 0):
        print("el número %s no es primo" %i)
        count = 0
    else:
        print("el número %s si es primo" %i)
    #print(i)
# Now i wanna verify if a random number is random or not. 





for i in range(2,n):
    print("i: ",i)
    for j in range(2,i):
        print("j: ",j)
        if(i%j == 0):
            count = count + 1
    if(count > 0):
        #print("El número no es primo")
        count = 0
                #count = 0
    else:
        print(i,"Si es primo")
"""
n = int(input("n: "))
count =0

for i in range(2, n+1):
    if(n%i ==0):
        count= count  +1
    
if(count > 1):
   print("numero %s no es primo" %n)
else:
    print("numero %s SI LO ES" %n)