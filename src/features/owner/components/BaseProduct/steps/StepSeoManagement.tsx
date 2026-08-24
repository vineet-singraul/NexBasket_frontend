import { useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Box, Typography, TextField, FormControl, Select, MenuItem, Switch, IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'

/**
 * Phase 6 — SEO & Product Management
 * Fields: metaTitle, metaDescription, searchKeywords, tags, status, visibility, isFeatured, isActive
 * Design-only: static markup, no value/onChange wiring (tags chip list keeps local UI state only).
 */
const StepSeoManagement = () => {
  const [tags, setTags] = useState<string[]>(['organic', 'fresh'])
  const [tagInput, setTagInput] = useState('')

  const handleTagInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    const value = tagInput.trim()
    if (!value || tags.includes(value)) {
      setTagInput('')
      return
    }
    setTags((prev) => [...prev, value])
    setTagInput('')
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove))
  }

  return (
    <Box className={style.ABP_StepPanel}>
      {/* SEO */}
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>SEO</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Meta Title</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="Shown on search engine results" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Meta Description</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="Shown as the search engine snippet"
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Search Keywords</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="Comma separated, e.g. tomato, fresh, organic"
            />
          </Box>
        </Box>
      </Box>

      {/* Tags */}
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Tags</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Tags</Typography>
            <Box className={style.ABP_TagsBox}>
              {tags.map((tag) => (
                <Box key={tag} className={style.ABP_Tag}>
                  {tag}
                  <IconButton
                    className={style.ABP_TagRemoveBtn}
                    size="small"
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove ${tag} tag`}
                  >
                    <CloseRoundedIcon className={style.ABP_TagRemoveIcon} />
                  </IconButton>
                </Box>
              ))}
              <input
                className={style.ABP_TagsInput}
                placeholder="Add a tag and press enter"
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                onKeyDown={handleTagInputKeyDown}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Product Management */}
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Product Management</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Status</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select defaultValue="draft" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Visibility</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select defaultValue="public" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
                <MenuItem value="public">Public</MenuItem>
                <MenuItem value="private">Private</MenuItem>
                <MenuItem value="hidden">Hidden</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={style.ABP_SwitchRow}>
          <Box className={style.ABP_SwitchCard}>
            <Box className={style.ABP_SwitchText}>
              <Typography className={style.ABP_SwitchTitle}>Featured</Typography>
              <Typography className={style.ABP_SwitchDesc}>Show on featured shelves</Typography>
            </Box>
            <Switch className={style.ABP_Switch} size="small" />
          </Box>

          <Box className={style.ABP_SwitchCard}>
            <Box className={style.ABP_SwitchText}>
              <Typography className={style.ABP_SwitchTitle}>Active</Typography>
              <Typography className={style.ABP_SwitchDesc}>Visible to customers</Typography>
            </Box>
            <Switch className={style.ABP_Switch} size="small" defaultChecked />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepSeoManagement
