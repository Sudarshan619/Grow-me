import React, { useState } from 'react';
import { Box, Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
  name: string;
  subDepartments: string[];
}

const departments: Department[] = [
    { name: 'HR', subDepartments: ['Recruitment', 'Operations', 'Employee Relations'] },
    { name: 'Engineering', subDepartments: ['Development', 'QA', 'DevOps', 'Technical Support'] },
    { name: 'Marketing', subDepartments: ['Content', 'SEO', 'Advertising', 'Social Media'] },
    { name: 'Sales', subDepartments: ['Domestic Sales', 'International Sales', 'Sales Operations'] },
    { name: 'Finance', subDepartments: ['Accounting', 'Financial Planning', 'Treasury', 'Audit'] },
    { name: 'IT', subDepartments: ['Infrastructure', 'Security', 'Support'] },
    { name: 'Customer Service', subDepartments: ['Support', 'Feedback', 'Customer Success'] }
  ];

const ExpandableList: React.FC = () => {
  const [open, setOpen] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  /*Added to handle the click on the department*/
  const handleToggle = (department: string) => {
    setOpen((prev) => prev.includes(department) ? prev.filter(d => d !== department) : [...prev, department]);
  };


  /*Added to handle selected sub_department */
  /* when the user click on the checkbox if it is a department it will select its child but if we select only child it will take the department and get the child checkbox*/
  const handleSelect = (department: string, isSubDepartment?: boolean) => {
    if (isSubDepartment) {
      setSelected((prev) => ({ ...prev, [department]: !prev[department] }));
    } else {
      const allSelected = departments.find(d => d.name === department)?.subDepartments.every(sub => selected[sub]);
      const newSelected = { ...selected };
      if (allSelected) {
        departments.find(d => d.name === department)?.subDepartments.forEach(sub => { newSelected[sub] = false; });
      } else {
        departments.find(d => d.name === department)?.subDepartments.forEach(sub => { newSelected[sub] = true; });
      }
      setSelected(newSelected);
    }
  };

  return (
    <List style={{background:'white', height:'60vh',overflow:'auto'}}>
      {departments.map((department) => (
        <Box key={department.name}>
          <ListItem onClick={() => handleToggle(department.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={department.subDepartments.every(sub => selected[sub])}
                tabIndex={-1}
                disableRipple
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(department.name);
                }}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            <IconButton>
              {open.includes(department.name) ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItem>
          
          <Collapse in={open.includes(department.name)} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((sub) => (
                <ListItem key={sub} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={!!selected[sub]}
                      tabIndex={-1}
                      disableRipple
                      onClick={() => handleSelect(sub, true)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
};

export default ExpandableList;
