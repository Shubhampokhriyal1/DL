import tkinter as tk
from tkinter import filedialog,Text
import os
from miniproject import pridct
root=tk.Tk()

def addApp():
	for widget in frame.winfo_children():
		widget.destroy()
	openFile = tk.Button(frame,text="Choose X-Ray",padx=10,pady=5,fg="white",bg="#263D42",command=addApp)
	openFile.pack()
	filename=filedialog.askopenfilename(initialdir="/",title="Select File",filetypes=(("Images","*.jpeg"),("all files","*.*")))
	print(filename)
	try:
		result=pridct(filename)
		print(result[0][0])
		if result[0][0] == False :
			print ("NO")
			label=tk.Label(frame,text="Negative",bg="green",padx=20,pady=20,height=5)
			label.config(font=("Courier", 20))
			label.pack()
		if result[0][0] == True :
			print ("yes")
			label=tk.Label(frame,text="Positive",bg="red",padx=20,pady=20,height=5)
			label.config(font=("Courier", 20))
			label.pack()
	except Exception as e:
		print("exited")
	
	

canvas = tk.Canvas(root, height=700,width=700,bg='#263D42')
canvas.pack()

frame = tk.Frame(root, bg="white")
frame.place(relwidth=0.8,relheight=0.8 ,relx=0.1,rely=0.1)

openFile = tk.Button(frame,text="Choose X-Ray",padx=10,pady=5,fg="white",bg="#263D42",command=addApp)
openFile.pack()

root.mainloop()