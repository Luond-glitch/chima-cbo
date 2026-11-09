import {
  Scale, Users, Droplets, TreePine, Cpu, GraduationCap, Sprout, Handshake, Mountain,
  ShieldCheck, Leaf, Lightbulb, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Smartphone, Store, Landmark, CreditCard, Building2,
} from 'lucide-react';

// Names used in the data files → icon components.
export const iconMap = {
  Scale, Users, Droplets, TreePine, Cpu, GraduationCap, Sprout, Handshake, Mountain,
  ShieldCheck, Leaf, Lightbulb, Facebook, Twitter, Instagram, Linkedin, Youtube,
  Smartphone, Store, Landmark, CreditCard, Building2,
};

export const getIcon = (name) => iconMap[name] || Leaf;
