# Gaia
An open source javascript worldbuilding tool.  
Based on the videos of youtube.com/artifexian and the paper https://arxiv.org/abs/0707.2895.  

# Use information
All units are if not noted otherwise relative to the solar system:  
Sun (☉)  
Earth (🜨)  
Moon (☾︎)  
Astronomic Units (AU)= Distance between the earth and the sun.  
Lunar Distances (LD)= Distances between the moon and the earth.  

Happy Worldbuilding!  


# Code Overview
For each tab the relevant classes are grouped together.
Any edits will trigger an update method in the relevant "...Editor" object.
Drawing and updating will also be handled there with the exception of the
analyses that have their own block of methods.

Additionally there are some helper methods and the code for dealing with
saving, loading, exporting, initialization and some code for the menu.

All Units are usually relative to the solar system equivalent.
i.e. Stars are relative to the sun, Planets are relative to earth, Moons are relative to the moon.
Any differing method is named accordingly.

The editor objects are all very similar:
They have one or two set...Index methods that are triggered when the user changes the selected
object. They have an updateView method to update all non-input fields and an invalidateFields
method to delete output if the input isn't valid.
The updateList(s) methods reload the object selection lists (e.g if the name of a planet has changed).
The same goes for the updateSelector(s) methods.
The redraw methods update the canvas.
Most Functions that start in update... are callbacks for the different input fields/selectors.
