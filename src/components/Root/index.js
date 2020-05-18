import React, { useState, useEffect } from 'react'
import { Grid, TextField, Paper, Button, ListItem, ListItemText, List, Typography, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  formField: {
    margin: '10px',
  },
  formFieldSmall: {
    margin: '10px',
    width: '80px',
  },
  paper: {
    backgroundColor: '#e0d1bb',
    borderRadius: '10px',
    border: '3px solid ' + theme.palette.primary.main,
  },
}))

const checkSatusModification = (status) => {
  let value = Number(status)
  if (value === 0 || value === 1) {
    console.log('Hey')
    return -5
  }
  if (value === 10 || value === 11) {
    return 0
  }
  if (value > 25) {
    return 7 + Math.floor((value - 25) / 2)
  }
  if (value < 10) {
    return Math.floor(value / 2) - 5
  } else {
    return Math.floor((value - 10) / 2)
  }
}

export default function Root(props) {
  const classes = useStyles()
  const [user, setUser] = useState({
    name: '',
    player: '',
    race: '',
    origin: '',
    class: '',
    lvl: 1,
    status: {
      str: { value: 10, mod: 0 },
      fin: { value: 10, mod: 0 },
      con: { value: 10, mod: 0 },
      int: { value: 10, mod: 0 },
      wis: { value: 10, mod: 0 },
      cha: { value: 10, mod: 0 },
    },
    hpMax: 100,
    mpMax: 100,
    hp: 100,
    mp: 100,
    attacks: [],
    armorOther: 0,
    shieldBonuses: 0,
    armorBonuses: 0,
    armor: {
      name: '',
      pen: 0,
    },
    shield: {
      name: '',
      pen: 0,
    },
    anotherFeatures: '',
    skills: [],
    gold: 0,
  })
  const [equip, setEquip] = useState({})
  const [bag, setBag] = useState([])
  const [talent, setTalent] = useState('')
  const [expertises, setExpertises] = useState([
    { name: 'Acrobacia+', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Adestramento', status: 'cha', other: 0, training: 0, hasIt: true },
    { name: 'Atletismo', status: 'str', other: 0, training: 0, hasIt: true },
    { name: 'Atuação', status: 'cha', training: 0, other: 0, hasIt: true },
    { name: 'Cavalgar', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Conhecimento*', status: 'int', other: 0, training: 0, hasIt: true },
    { name: 'Cura', status: 'wis', other: 0, training: 0, hasIt: true },
    { name: 'Diplomacia', status: 'cha', other: 0, training: 0, hasIt: true },
    { name: 'Enganação', status: 'cha', other: 0, training: 0, hasIt: true },
    { name: 'Fortitude', status: 'con', other: 0, training: 0, hasIt: true },
    { name: 'Furtividade+', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Guerra', training: 0, other: 0, status: 'int', hasIt: true },
    { name: 'Iniciativa', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Intimidação', status: 'cha', other: 0, training: 0, hasIt: true },
    { name: 'Intuição', status: 'wis', other: 0, training: 0, hasIt: true },
    { name: 'Investigação', status: 'int', other: 0, training: 0, hasIt: true },
    { name: 'Jogatina', status: 'cha', other: 0, training: 0, hasIt: true },
    { name: 'Ladinagem*+', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Luta', status: 'str', other: 0, training: 0, hasIt: true },
    { name: 'Misticismo*', status: 'int', other: 0, training: 0, hasIt: true },
    { name: 'Navegação*', status: 'wis', other: 0, training: 0, hasIt: true },
    { name: 'Nobreza*', status: 'int', other: 0, training: 0, hasIt: true },
    { name: 'Percepção', status: 'wis', other: 0, training: 0, hasIt: true },
    { name: 'Pontaria', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Reflexos', status: 'fin', other: 0, training: 0, hasIt: true },
    { name: 'Religião', status: 'wis', other: 0, training: 0, hasIt: true },
    { name: 'Sobrevicência', status: 'wis', other: 0, training: 0, hasIt: true },
    { name: 'Vontade', status: 'wis', other: 0, training: 0, hasIt: true },
  ])
  const [weapons, setWeapons] = useState([])
  const [weapon, setWeapon] = useState({ name: '', type: '', damage: 0, range: '', bonuses: 0 })
  const [talents, setTalents] = useState([])

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))
    }
    if (localStorage.getItem('bag')) {
      setBag(JSON.parse(localStorage.getItem('bag')))
    }
    if (localStorage.getItem('weapons')) {
      setWeapons(JSON.parse(localStorage.getItem('weapons')))
    }
    if (localStorage.getItem('expertises')) {
      setExpertises(JSON.parse(localStorage.getItem('expertises')))
    }
    if (localStorage.getItem('talents')) {
      setTalents(JSON.parse(localStorage.getItem('talents')))
    }
  }, [])

  const handleUserChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const handleUserStatusChange = (e) => {
    const { name, value } = e.target
    setUser({ ...user, status: { ...user.status, [name]: { value, mod: checkSatusModification(value) } } })
  }

  return (
    <div className={classes.background}>
      <Grid style={{ paddingTop: '50px' }} container spacing={2}>
        <Grid item lg={7} sm={6}>
          <Button variant="contained" color="primary">
            Personagem
          </Button>
          <Paper className={classes.paper} variant="outlined">
            <TextField variant="outlined" className={classes.formField} type="text" value={user.name} onChange={handleUserChange} name="name" label="Nome" />
            <TextField variant="outlined" className={classes.formField} type="text" value={user.player} onChange={handleUserChange} name="player" label="Jogador" />
            <br />
            <TextField variant="outlined" className={classes.formField} type="text" value={user.race} onChange={handleUserChange} name="race" label="Raça" />
            <TextField variant="outlined" className={classes.formField} type="text" value={user.origin} onChange={handleUserChange} name="origin" label="Origem" />
            <TextField variant="outlined" className={classes.formField} type="text" value={user.class} onChange={handleUserChange} name="class" label="Classe" />
            <TextField variant="outlined" className={classes.formField} type="number" value={user.lvl} onChange={handleUserChange} name="lvl" label="Nível" />
          </Paper>
          <br />
          <Button variant="contained" color="primary">
            Atributos
          </Button>
          <Paper className={classes.paper} variant="outlined">
            <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.status.str.value} onChange={handleUserStatusChange} name="str" label="FOR" />
            <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex', color: user.status.str.mod > 0 ? 'blue' : 'red' }}>
              {user.status.str.mod}
            </Typography>
            <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.status.fin.value} onChange={handleUserStatusChange} name="fin" label="DES" />
            <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex', color: user.status.fin.mod > 0 ? 'blue' : 'red' }}>
              {user.status.fin.mod}
            </Typography>
            <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.status.con.value} onChange={handleUserStatusChange} name="con" label="CON" />
            <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex', color: user.status.con.mod > 0 ? 'blue' : 'red' }}>
              {user.status.con.mod}
            </Typography>
            <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.status.int.value} onChange={handleUserStatusChange} name="int" label="INT" />
            <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex', color: user.status.int.mod > 0 ? 'blue' : 'red' }}>
              {user.status.int.mod}
            </Typography>
            <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.status.wis.value} onChange={handleUserStatusChange} name="wis" label="SAB" />
            <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex', color: user.status.wis.mod > 0 ? 'blue' : 'red' }}>
              {user.status.wis.mod}
            </Typography>
            <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.status.cha.value} onChange={handleUserStatusChange} name="cha" label="CAR" />
            <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex', color: user.status.cha.mod > 0 ? 'blue' : 'red' }}>
              {user.status.cha.mod}
            </Typography>
          </Paper>
          <br />
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Button variant="contained" color="primary">
                Pontos de vida
              </Button>
              <Paper className={classes.paper} variant="outlined">
                <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.hp} onChange={handleUserChange} name="hp" label="Pontos de vida" />
                <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.hpMax} onChange={handleUserChange} name="hpMax" label="Vida máxima" />
              </Paper>
            </Grid>
            <Grid item sm={6}>
              <Button variant="contained" color="primary">
                Pontos de mana
              </Button>
              <Paper className={classes.paper} variant="outlined">
                <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.mp} onChange={handleUserChange} name="mp" label="Mana" />
                <TextField variant="outlined" className={classes.formFieldSmall} type="number" value={user.mpMax} onChange={handleUserChange} name="mpMax" label="Mana máxima" />
              </Paper>
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary">
            Armas
          </Button>
          <Paper className={classes.paper} variant="outlined">
            {
              <List>
                {weapons.map((el, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={el.name + ' - ' + el.type}
                      secondary={
                        <span>
                          <b>Dano:</b> {el.damage}
                          <br />
                          <b>Bônus:</b> {el.bonuses}
                          <br />
                          <b>Crítico:</b> {el.crit}
                          <br />
                          <b>Alcance:</b> {el.range}
                        </span>
                      }
                    ></ListItemText>

                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => {
                          setWeapons(weapons.filter((e, ind) => ind !== index))
                        }}
                        variant="outlined"
                        color="primary"
                      >
                        Remover
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            }
            <TextField
              variant="outlined"
              style={{ padding: '8px' }}
              type="text"
              value={weapon.name}
              onChange={(e) => {
                setWeapon({ ...weapon, name: e.target.value })
              }}
              label="Arma"
            />
            <TextField
              variant="outlined"
              style={{ padding: '8px' }}
              value={weapon.damage}
              onChange={(e) => {
                setWeapon({ ...weapon, damage: e.target.value })
              }}
              label="Dano"
            />
            <TextField
              variant="outlined"
              style={{ padding: '8px' }}
              value={weapon.crit}
              onChange={(e) => {
                setWeapon({ ...weapon, crit: e.target.value })
              }}
              label="Crítico"
            />
            <TextField
              variant="outlined"
              style={{ padding: '8px' }}
              label="Bônus de dano"
              value={weapon.bonuses}
              onChange={(e) => {
                setWeapon({ ...weapon, bonuses: e.target.value })
              }}
            />
            <TextField
              variant="outlined"
              style={{ padding: '8px' }}
              type="text"
              value={weapon.type}
              onChange={(e) => {
                setWeapon({ ...weapon, type: e.target.value })
              }}
              label="Tipo"
            />
            <TextField
              variant="outlined"
              style={{ padding: '8px' }}
              value={weapon.range}
              onChange={(e) => {
                setWeapon({ ...weapon, range: e.target.value })
              }}
              label="Alcance"
            />
            <br />
            <Button
              className={classes.formField}
              variant="outlined"
              onClick={() => {
                setWeapons([...weapons, weapon])
                setWeapon({ name: '', range: '', type: '', damage: 0, bonuses: 0 })
              }}
            >
              Adicionar
            </Button>
            <br />
          </Paper>
          <br />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Button variant="contained" color="primary">
                Classe de Armadura
              </Button>
              <Paper className={classes.paper} variant="outlined">
                <Typography variant="h6" style={{ paddingTop: '18px', display: 'inline-flex' }} className={classes.formField}>
                  <b style={{ color: 'brown' }}>{10 + user.status.fin.mod + Number(user.armorOther) + Number(user.armorBonuses) + Number(user.shieldBonuses)}</b> = {10} + {user.status.fin.mod} +{' '}
                  {user.armorBonuses} +{user.shieldBonuses} +
                </Typography>
                <TextField
                  variant="outlined"
                  className={classes.formField}
                  type="number"
                  value={user.armorOther}
                  onChange={handleUserChange}
                  name="armorOther"
                  label="Outros"
                  style={{ width: '100px' }}
                />
              </Paper>
              <br />
              <Button variant="contained" color="primary">
                Escudo e armadura
              </Button>
              <Paper className={classes.paper} variant="outlined">
                <TextField
                  variant="outlined"
                  className={classes.formField}
                  type="text"
                  style={{ marginRight: '0px' }}
                  value={user.armor.name}
                  onChange={(e) => {
                    setUser({ ...user, armor: { ...user.armor, name: e.target.value } })
                  }}
                  name="name"
                  label="Armadura"
                />
                <TextField
                  variant="outlined"
                  style={{ width: '80px' }}
                  className={classes.formField}
                  type="Number"
                  value={user.armorBonuses}
                  onChange={handleUserChange}
                  name="armorBonuses"
                  label="Bônus"
                />
                <TextField
                  variant="outlined"
                  className={classes.formField}
                  type="Number"
                  style={{ width: '80px' }}
                  value={user.armor.pen}
                  onChange={(e) => {
                    setUser({ ...user, armor: { ...user.armor, pen: e.target.value } })
                  }}
                  name="name"
                  label="Penalidade"
                />
                <br />
                <TextField
                  variant="outlined"
                  className={classes.formField}
                  type="text"
                  style={{ marginRight: '0px' }}
                  value={user.shield.name}
                  onChange={(e) => {
                    setUser({ ...user, shield: { ...user.shield, name: e.target.value } })
                  }}
                  name="name"
                  label="Escudo"
                />
                <TextField
                  variant="outlined"
                  style={{ width: '80px' }}
                  className={classes.formField}
                  type="Number"
                  value={user.shieldBonuses}
                  onChange={handleUserChange}
                  name="shieldBonuses"
                  label="Bônus"
                />
                <TextField
                  variant="outlined"
                  className={classes.formField}
                  type="Number"
                  style={{ width: '80px' }}
                  value={user.shield.pen}
                  onChange={(e) => {
                    setUser({ ...user, shield: { ...user.shield, pen: e.target.value } })
                  }}
                  name="name"
                  label="Penalidade"
                />
              </Paper>
            </Grid>
          </Grid>
          <br />
          <Button variant="contained" color="primary">
            Talentos e habilidades
          </Button>
          <Paper className={classes.paper} variant="outlined">
            {
              <List>
                {talents.map((el, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={el}></ListItemText>
                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => {
                          setTalents(talents.filter((e, ind) => ind !== index))
                        }}
                        variant="outlined"
                        color="primary"
                      >
                        Remover
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            }
            <TextField
              variant="outlined"
              fullWidth
              style={{ padding: '8px' }}
              type="text"
              value={talent}
              onChange={(e) => {
                setTalent(e.target.value)
              }}
              label="Descreva seu talento ou habilidade:"
            />
            <br />
            <Button
              className={classes.formField}
              variant="outlined"
              onClick={() => {
                setTalents([...talents, talent])
                setTalent('')
              }}
            >
              Adicionar
            </Button>
            <br />
          </Paper>
        </Grid>
        <Grid item lg={5} sm={6}>
          <Button variant="contained" color="primary">
            Perícias
          </Button>
          <Paper className={classes.paper}>
            <List style={{ maxHeight: '820px', overflowY: 'auto' }}>
              {expertises.map((el, index) => (
                <ListItem key={index}>
                  <Checkbox
                    checked={el.hasIt}
                    color="primary"
                    onClick={(e) => {
                      let newExpertises = [...expertises]
                      newExpertises[index].hasIt = !newExpertises[index].hasIt
                      setExpertises(newExpertises)
                    }}
                  />
                  <ListItemText
                    primary={el.name + ':'}
                    style={{ width: '30%' }}
                    secondary={
                      <Typography variant="h6" color="primary">
                        {el.other + el.training + user.status[el.status].mod + Math.floor(Number(user.lvl) / 2)}
                      </Typography>
                    }
                  />
                  <TextField
                    variant="outlined"
                    style={{ marginLeft: '8px', width: '100px' }}
                    type="number"
                    value={el.training}
                    onChange={(e) => {
                      let newExpertises = [...expertises]
                      newExpertises[index].training = Number(e.target.value)
                      setExpertises(newExpertises)
                    }}
                    label="Treino"
                  />
                  <TextField
                    style={{ width: '100px' }}
                    variant="outlined"
                    type="number"
                    value={el.other}
                    onChange={(e) => {
                      let newExpertises = [...expertises]
                      newExpertises[index].other = Number(e.target.value)
                      setExpertises(newExpertises)
                    }}
                    label="Outro"
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <br />
          <Button variant="contained" color="primary">
            Equipamentos
          </Button>
          <Paper className={classes.paper} variant="outlined">
            {
              <List>
                {bag.map((el, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={el.name}></ListItemText>
                    <ListItemSecondaryAction>
                      <Button
                        onClick={() => {
                          setBag(bag.filter((e, ind) => ind !== index))
                        }}
                        variant="outlined"
                        color="primary"
                      >
                        Remover
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            }
            <TextField
              variant="outlined"
              className={classes.formField}
              type="text"
              value={equip.name}
              onChange={(e) => {
                setEquip({ ...equip, name: e.target.value })
              }}
              name="equip"
              label="Descreva o equipamento"
            />
            <br />
            <Button
              className={classes.formField}
              variant="outlined"
              onClick={() => {
                setBag([...bag, equip])
                setEquip({ name: '' })
              }}
            >
              Adicionar
            </Button>
            <br />
            <Grid container justify="flex-end">
              <TextField variant="outlined" className={classes.formField} style={{ width: '150px' }} type="Number" value={user.gold} onChange={handleUserChange} name="gold" label="T$" />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <Button variant="contained" color="primary">
        Outras características
      </Button>
      <Paper className={classes.paper} variant="outlined">
        <TextField
          variant="outlined"
          style={{ padding: '8px' }}
          fullWidth
          type="text"
          multiline
          rows={4}
          value={user.anotherFeatures}
          onChange={handleUserChange}
          name="anotherFeatures"
          placeholder="Me conte sua história"
        />
      </Paper>
      <br />
      <Button
        style={{ position: 'fixed', top: 0, right: 0 }}
        variant="contained"
        color="primary"
        onClick={() => {
          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('weapons', JSON.stringify(weapons))
          localStorage.setItem('bag', JSON.stringify(bag))
          localStorage.setItem('expertises', JSON.stringify(expertises))
          localStorage.setItem('talents', JSON.stringify(talents))
        }}
      >
        Salvar
      </Button>
    </div>
  )
}
