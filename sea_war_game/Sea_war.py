def display(map):
    print("   ", end ="")
    for i in range(n):
        print(list[i], end ="  ")
    print()
    for i in range(n):
        for j in range(n+1):
            if j == 0:
                print(i+1, end = "  ")
            else:
                print(map[i][j-1], end = "  ")
        print()
def menu():
    print("Sea Battle is a classic board game for two players. The playing field is a grid of 8 by 8 cells. Each player places his ships on his field: one ship occupies 4 squares, this is the commander's ship, and six ships, each of which occupies 1 square. The goal of the game is to destroy all enemy ships by shooting at his field and trying to hit the ships. The players take turns calling the coordinates for the attack, for example, ‘A1’ or ‘E5’, and report the result - ‘hit’, ‘missed’ or ‘sunk'. The winner is the player who destroys all enemy ships first.")
    print("1)Start game")
    print("2)Exit")
def check_adjacent(map1, integer, k, n):
    for j in range(-1, 2, 2):
        if 0 <= k+j < n:
            if map1[integer-1][k+j] == "|":
                return True
    for i in range(-1, 2, 2):
        if 0 <= integer-1+i < n:
            if map1[integer-1+i][k] == "|":
                return True
    return False
step = 0
list = "ABCDEFGH"
n = 8
ship4x = 1
ship3x = 2
ship1x = 4
map1 = [["~"] * n for i in range(n)]
map2 = [["~"] * n for i in range(n)]
map12 = [["~"] * n for i in range(n)]
map22 = [["~"] * n for i in range(n)]
menu()
a = int(input())
if a == 1:
    print("The game was started")
    player1 = 0
    player2 = 0
    print("Player 1 Turn to create a board")
    print("Player 1 4x ship plaicing:")
    while step < 1:
        display(map1)
        step = step + 1
        z = input()
        if len(z) != 2:
            print("Error input")
            step = step - 1
            continue
        alpha, integer = z
        alpha = alpha.upper()
        for i in range(len(list)):
            if alpha == list[i]:
                k = i
        if alpha.isalpha() and integer.isdigit() and len(z) == 2:
            integer = int(integer)
            if alpha in list and integer < n+1:
                DOWN = bool(integer <= 4)
                UP = bool(integer >= 4)
                RIGHT = bool(k <= 3)
                LEFT = bool(k >= 3)
                print("Player 1 can place 4x ship on this direction -->", end = "")
                if UP:
                    print("Up", end =",")
                if DOWN:
                    print("Down", end =",")
                if LEFT:
                    print("Left", end =",")
                if RIGHT:
                    print("Right", end =",")
                print()
                direction = input()
                direction = direction.upper()
                if direction == "UP" and UP:
                    map1[integer-1][k] = "|"
                    map1[int(integer)-2][k] = "|" 
                    map1[int(integer)-3][k] = "|" 
                    map1[int(integer)-4][k]  = "|"
                    continue
                if direction == "DOWN" and DOWN:
                    map1[integer-1][k] = "|"
                    map1[int(integer)][k] = "|" 
                    map1[int(integer)+1][k] = "|" 
                    map1[int(integer)+2][k]  = "|"
                    continue
                if direction == "LEFT" and LEFT:
                    map1[integer-1][k] = "|"
                    map1[int(integer)-1][k-1] = "|" 
                    map1[int(integer)-1][k-2] = "|" 
                    map1[int(integer)-1][k-3]  = "|"
                    continue
                if direction == "RIGHT" and RIGHT:
                    map1[integer-1][k] = "|"
                    map1[int(integer)-1][k+1] = "|" 
                    map1[int(integer)-1][k+2] = "|" 
                    map1[int(integer)-1][k+3]  = "|"
                    continue
                if direction not in ["UP","DOWN","LEFT","RIGHT"]:
                    print("ERROR INPUT")
                    step = step - 1
            else:
                print("Error input")
                step = step - 1
        else:
            print("Error input")
            step = step - 1
    step = 0 
    print("Player 1 1x ship plaicing:")
    display(map1)
    while step < 6:
        step = step + 1
        k = 0
        z = input()
        if len(z) != 2:
            print("Error input")
            step = step - 1
            continue
        alpha, integer = z
        alpha = alpha.upper()
        for i in range(len(list)):
            if alpha == list[i]:
                k = i
        if alpha.isalpha() and integer.isdigit() and len(z) == 2:
            integer = int(integer)
            if alpha in list and int(integer) < n+1:
                if map1[int(integer)-1][k] == "|":
                    step = step - 1
                    print("Chosee another point")
                    continue
                else:
                    is_adjacent = False
                    for i in range(-1, 2):
                        for j in range(-1, 2):
                            if 0 <= int(integer)-1+i < n and 0 <= k+j < n:
                                if map1[int(integer)-1+i][k+j] == "|":
                                    is_adjacent = True
                                    break
                        if is_adjacent:
                            break
                    if is_adjacent:
                        step = step - 1
                        print("Chosee another point")
                        continue
                    else:
                        map1[int(integer)-1][k] = "|"
            else:
                print("Error input")
                step = step - 1
                continue
        else:
            print("Error input")
            step = step - 1
            continue
        display(map1)
    step = 0
    print("First player placed all his Ships")
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print("Player 2 Turn to create a board")
    print("Player 2 4x ship plaicing:")
    while step < 1:
        display(map2)
        step = step + 1
        z = input()
        if len(z) != 2:
            print("Error input")
            step = step - 1
            continue
        alpha, integer = z
        alpha = alpha.upper()
        for i in range(len(list)):
            if alpha == list[i]:
                k = i
        if alpha.isalpha() and integer.isdigit() and len(z) == 2:
            integer = int(integer)
            if alpha in list and integer < n+1:
                DOWN = bool(integer <= 4)
                UP = bool(integer >= 4)
                RIGHT = bool(k <= 3)
                LEFT = bool(k >= 3)
                print("Player 2 can place 4x ship on this direction -->", end = "")
                if UP:
                    print("Up", end =",")
                if DOWN:
                    print("Down", end =",")
                if LEFT:
                    print("Left", end =",")
                if RIGHT:
                    print("Right", end =",")
                print()
                direction = input()
                direction = direction.upper()
                if direction == "UP" and UP:
                    map2[integer-1][k] = "|"
                    map2[int(integer)-2][k] = "|" 
                    map2[int(integer)-3][k] = "|" 
                    map2[int(integer)-4][k]  = "|"
                    continue
                if direction == "DOWN" and DOWN:
                    map2[integer-1][k] = "|"
                    map2[int(integer)][k] = "|" 
                    map2[int(integer)+1][k] = "|" 
                    map2[int(integer)+2][k]  = "|"
                    continue
                if direction == "LEFT" and LEFT:
                    map2[integer-1][k] = "|"
                    map2[int(integer)-1][k-1] = "|" 
                    map2[int(integer)-1][k-2] = "|" 
                    map2[int(integer)-1][k-3]  = "|"
                    continue
                if direction == "RIGHT" and RIGHT:
                    map2[integer-1][k] = "|"
                    map2[int(integer)-1][k+1] = "|" 
                    map2[int(integer)-1][k+2] = "|" 
                    map2[int(integer)-1][k+3]  = "|"
                    continue
                if direction not in ["UP","DOWN","LEFT","RIGHT"]:
                    print("ERROR INPUT")
                    step = step - 1
            else:
                print("Error input")
                step = step - 1
        else:
            print("Error input")
            step = step - 1
    step = 0 
    print("Player 2 1x ship plaicing:")
    display(map2)
    while step < 6:
        step = step + 1
        k = 0
        z = input()
        if len(z) != 2:
            print("Error input")
            step = step - 1
            continue
        alpha, integer = z
        alpha = alpha.upper()
        for i in range(len(list)):
            if alpha == list[i]:
                k = i
        if alpha.isalpha() and integer.isdigit() and len(z) == 2:
            integer = int(integer)
            if alpha in list and int(integer) < n+1:
                if map2[int(integer)-1][k] == "|":
                    step = step - 1
                    print("Chosee another point")
                    continue
                else:
                    is_adjacent = False
                    for i in range(-1, 2):
                        for j in range(-1, 2):
                            if 0 <= int(integer)-1+i < n and 0 <= k+j < n:
                                if map2[int(integer)-1+i][k+j] == "|":
                                    is_adjacent = True
                                    break
                        if is_adjacent:
                            break
                    if is_adjacent:
                        step = step - 1
                        print("Chosee another point")
                        continue
                    else:
                        map2[int(integer)-1][k] = "|"
            else:
                print("Error input")
                step = step - 1
                continue
        else:
            print("Error input")
            step = step - 1
            continue
        display(map2)
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    print()
    step = 0
    points1 = 0
    points2 = 0
    while True:
        if points2 == 10:
            print("Congratulate Player 2 Win!")
            break
        print("Player 1 turn to attack")
        display(map12)
        z = input()
        if len(z) != 2:
            print("Error input")
            continue
        alpha, integer = z
        alpha = alpha.upper()
        for i in range(len(list)):
            if alpha == list[i]:
                k = i
        if alpha.isalpha() and integer.isdigit() and len(z) == 2:
            integer = int(integer)
            if alpha in list and integer < n+1:
                if(map2[int(integer)-1][k] == "~"):
                    map12[int(integer)-1][k] = "O"
                    display(map12)
                    print("Player 1 Missed")

                elif(map2[int(integer)-1][k] == "|") and check_adjacent(map2, integer, k, n):
                    map12[int(integer)-1][k] = "X"
                    display(map12)
                    print("Player 1 Hitted the ship")
                    points1 = points1 + 1
                else:
                    map12[int(integer)-1][k] = "X"
                    display(map12)
                    print("Player 1 Sunked the ship")
                    points1 = points1 + 1
            else:
                print("Error input")
        else:
            print("Error input")
        if points1 == 5:
            print("Congratulate Player 1 Win!")
            break
        print("Player 2 turn to attack")
        display(map22)
        z = input()
        if len(z) != 2:
            print("Error input")
            continue
        alpha, integer = z
        alpha = alpha.upper()
        for i in range(len(list)):
            if alpha == list[i]:
                k = i
        if alpha.isalpha() and integer.isdigit() and len(z) == 2:
            integer = int(integer)
            if alpha in list and integer < n+1:
                if(map1[int(integer)-1][k] == "~"):
                    map22[int(integer)-1][k] = "O"
                    print("Player 2 Missed")

                elif(map1[int(integer)-1][k] == "|") and check_adjacent(map1, integer, k, n):
                    map22[int(integer)-1][k] = "X"
                    map1[int(integer)-1][k] = "~"
                    print("Player 2 Hitted the ship")

                    points2 = points2 + 1
                else:
                    map22[int(integer)-1][k] = "X"
                    map1[int(integer)-1][k] = "~"
                    print("Player 2 Sunked the ship")
                    points2 = points2 + 1
            else:
                print("Error input")
        else:
            print("Error input")
        if points2 == 10:
            print("Congratulate Player 2 Win!")
            break
if a == 2:
    print("The game is stopped")